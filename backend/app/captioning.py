import pickle
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.layers import TextVectorization
from tensorflow.keras.preprocessing.sequence import pad_sequences
import matplotlib.pyplot as plt

# setting max_length to the same value while training
max_length = 47

# importing saved captioning model
captioning_model = tf.keras.models.load_model(r"./machine-learning/model_49.h5")

# Read the loss function from model_loss.txt
with open("./machine-learning/model_loss.txt", "r") as file:
    loss_function = file.read().strip()

# Compile the model manually using the loss function from model_loss.txt
captioning_model.compile(optimizer='adam', loss=loss_function)

# importing saved TextVectorization layer
from_disk = pickle.load(open(r"./machine-learning/tv_layer.pkl", "rb"))
vectorize_layer = TextVectorization.from_config(from_disk['config'])
vectorize_layer.adapt(tf.data.Dataset.from_tensor_slices(["xyz"]))
vectorize_layer.set_weights(from_disk['weights'])

# restoring vocab using TextVectorization layer
vocabulary = list(vectorize_layer.get_vocabulary())
vocab_size = vectorize_layer.vocabulary_size()

# loading saved features extractor model
features_extractor = tf.keras.models.load_model(r"./machine-learning/features_extractor.h5")

# extracting features from images
def get_features_from_image(image_path, model):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))
    img = np.expand_dims(img, axis=0)
    img = img / 127.5
    img = img - 1
    features = model.predict(img)
    return features

# getting word from vocab using provided index
def get_word(index, vocab):
    word = vocab[index]
    return word

# getting top k probabilities and indexes
def get_word_preds(sentence, testing_image, beam_size):
    sequenced_caption = vectorize_layer(tf.constant([sentence])).numpy().tolist()
    padded_sequenced_caption = pad_sequences(sequenced_caption, maxlen=max_length, padding='post')[0]
    padded_sequenced_caption = np.resize(padded_sequenced_caption, (1, max_length))
    preds = captioning_model.predict([testing_image, padded_sequenced_caption])
    word_preds_indexes = np.argsort(preds[0])[-beam_size:]
    return preds, word_preds_indexes

# getting top k captions using beam search algorithm
def get_caption_with_beam(image_path, beam_size):
    # extracting image feature
    my_testing_image = get_features_from_image(image_path, features_extractor)

    cap = "<start>"
    current_k_sentences = {}
    final_captions = []
    new_hypotheses = []

    preds, word_preds_indexes = get_word_preds(cap, my_testing_image, beam_size)

    for w in word_preds_indexes:
        new_seq = [cap]
        new_seq.append(get_word(w, vocabulary))
        new_hypotheses.append((new_seq, preds[0][w]))

    new_hypotheses = sorted(new_hypotheses, key=lambda x: x[1], reverse=True)[:beam_size]
    for seq, prob in new_hypotheses:
        current_k_sentences[" ".join(seq)] = prob

    for _ in range(max_length - 1):
        all_sentences = []

        for sentence in current_k_sentences.keys():
            # making sure the caption stops at "end"
            if sentence[-3:] == "end":
                final_captions.append((sentence, current_k_sentences[sentence]))
                beam_size = beam_size - 1
                if beam_size == 0:
                    break
                continue

            preds, word_preds_indexes = get_word_preds(sentence, my_testing_image, beam_size)

            new_hypotheses = []

            for w in word_preds_indexes:
                new_seq = [sentence]
                new_seq.append(get_word(w, vocabulary))
                new_hypotheses.append((new_seq, current_k_sentences[sentence] * preds[0][w]))

            new_hypotheses = sorted(new_hypotheses, key=lambda x: x[1], reverse=True)[:beam_size]

            for seq, prob in new_hypotheses:
                all_sentences.append((" ".join(seq), prob))

        all_sentences = sorted(all_sentences, key=lambda x: x[1], reverse=True)[:beam_size]
        current_k_sentences = {}
        for seq, prob in all_sentences:
            current_k_sentences["".join(seq)] = prob

        if beam_size == 0:
            break

    # printing top k captions
    final_captions = sorted(final_captions, key=lambda x: x[1], reverse=True)
    for cap, prob in final_captions:
        return (cap[8:-4])

    # displaying testing image
    image = plt.imread(image_path)
    fig, ax = plt.subplots()
    ax.imshow(image)
    ax.axis('off')
    plt.show()
