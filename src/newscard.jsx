import { Box, Center } from "@chakra-ui/react";

const NewsCard = ({ title, description, imageUrl, images }) => {
    
    debugger;
    if(images.length > 0){
        var imageSrc = images[0].url
    }

    return (
        <Box
            borderWidth="1px" 
            borderRadius="md" 
            boxShadow="lg"  // Applied larger shadow for better effect
            bg="white"
            height="auto" 
            display="flex"
            flexDirection="column"
            alignItems="center"
            overflow="hidden" // Prevent content overflow
        >
            {/* Image Section */}
            <Box width="100%" height="200px" overflow="hidden">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <Center 
                        className="bg-gray-200 flex items-center justify-center"
                        style={{ width: '100%', height: '100%' }}
                    >
                        No Image Available
                    </Center>
                )}
            </Box>

            {/* Title and Description Section */}
            <Box p={3} textAlign="center" width="100%">
                <h2 style={{ fontWeight: 'bold' }} className="text-xl font-bold mb-2">
                    {title}
                </h2>
                <p className="text-gray-700">{description}</p>
            </Box>
        </Box>
        
    );
};

export default NewsCard;