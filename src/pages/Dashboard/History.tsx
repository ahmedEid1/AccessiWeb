import { Box } from "@mui/material";
import { Chrono } from "react-chrono";

export const History = () => {
  const items = [
    {
      title: "27 May, 2024",
      cardTitle: "Plate of Fruits",
      media: {
        name: "berries",
        source: {
          url: "https://res.cloudinary.com/luminousity/image/upload/v1688675918/ChefSpice/Rectangle_534_1_wn4edl.png",
        },
        type: "IMAGE",
      },
      cardSubtitle: "Plate of Fruits",
      cardDetailedText: `A plate of berries typically consists of a vibrant and colorful assortment of fresh berries, such as strawberries, blueberries, raspberries, and blackberries. The berries are usually washed and arranged attractively on a plate, highlighting their natural hues and textures. This mix provides a delightful combination of flavors, ranging from the sweetness of strawberries to the tartness of raspberries. The presentation is both appetizing and visually appealing, making it a perfect addition to a breakfast spread, a healthy snack, or a refreshing dessert. The berries are rich in vitamins, antioxidants, and fiber, offering a nutritious and delicious treat.`,
    },
    {
      title: "28 May, 2024",
      cardTitle: "Moon Astronaut",
      media: {
        name: "Astronaut",
        source: {
          url: "https://res.cloudinary.com/luminousity/image/upload/v1716838821/ChefSpice/b06164b2bde6aa4b3b7f0e2f3d744252_glk3ut.jpg",
        },
        type: "IMAGE",
      },
      cardSubtitle: `Astronaut planting on the moon`,
      cardDetailedText: `The image shows an astronaut in a white spacesuit kneeling on the gray, dusty surface of the moon. With Earth visible in the dark sky behind, the astronaut is carefully planting a small seed into the lunar soil. The scene captures a moment of hope and the pioneering spirit of exploration, symbolizing the potential for new beginnings even in the most unlikely places.`,
    },
    {
      title: "29 May, 2024",
      cardTitle: "Mathematical Equation",
      media: {
        name: "Mathematics",
        source: {
          url: "https://res.cloudinary.com/luminousity/image/upload/v1716838849/ChefSpice/dfdde0059e5e5e00d70599e5cd3cec26_xoedhk.jpg",
        },
        type: "IMAGE",
      },
      cardSubtitle: `Mathematical Equation`,
      // eslint-disable-next-line no-useless-escape
      cardDetailedText: `The board is filled with an array of mathematical equations, each representing significant concepts. Among them are the elegant simplicity of \( E = mc^2 \), the foundational \( a^2 + b^2 = c^2 \), and the intricate beauty of the Riemann Hypothesis's \( \zeta(s) = 0 \). Interspersed are calculus integrals, complex numbers in Euler's formula \( e^{i\pi} + 1 = 0 \), and statistical representations like \( \sigma = \sqrt{\frac{\sum (x - \mu)^2}{N}} \). The mix of symbols, numbers, and variables illustrates the profound interconnectedness of mathematical theory, evoking a sense of discovery and intellectual challenge.`,
    },
  ];
  return (
    <Box>
      <Box className="w-1/2  m-auto ">
        <Chrono items={items} mode="VERTICAL" slideShow disableToolbar />
      </Box>
    </Box>
  );
};
