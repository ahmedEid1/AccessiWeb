import { Box } from "@mui/material";
import { Chrono } from "react-chrono";
import { useState, useEffect } from "react";
import { useAuthContext } from "provider/useAuth";

interface HistoryItem {
  title: string;
  cardTitle: string;
  media: {
    name: string;
    source: {
      url: string;
    };
    type: string;
  };
  cardSubtitle: string;
  cardDetailedText: string;
}

export const History = () => {
  const { token } = useAuthContext();
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',  // Include credentials for session-based authentication
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); // Debugging: log fetched data

          const formattedItems = await Promise.all(data.map(async (item: any) => {
            const imageResponse = await fetch(`http://localhost:5000/get-image?image_name=${item.image_path}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
              credentials: 'include',
            });

            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              const url = URL.createObjectURL(blob);
              return {
                title: new Date(item.created_at).toLocaleDateString(),
                cardTitle: item.description,
                media: {
                  name: item.image_path,
                  source: {
                    url: url,
                  },
                  type: "IMAGE",
                },
                cardSubtitle: item.description,
                cardDetailedText: item.description,
              };
            } else {
              console.error('Failed to fetch image');
              return null;
            }
          }));

          const validItems = formattedItems.filter((item: any) => item !== null);
          console.log('Formatted items:', validItems); // Debugging: log formatted items
          setItems(validItems);
        } else {
          console.error('Failed to fetch history');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <Box>
      <Box className="md:w-1/2 m-auto">
        {items.length > 0 ? ( // Check if items are loaded
          <Chrono items={items} mode="VERTICAL" slideShow disableToolbar />
        ) : (
          <div>No history available</div>
        )}
      </Box>
    </Box>
  );
};

export default History;
