import { Box } from "@chakra-ui/react";

const NewsCard = ({ title, description, imageUrl, images }) => {
    
    if(images.length > 0){
        debugger;
        var imageSrc = images[0].url
    }

    return (
        <Box 
            p={2} // Reduced padding
            borderWidth="1px" 
            borderRadius="md" 
            shadow="sm" // Lighter shadow
            bg="white"
            height="300px" // Set a fixed height for uniformity
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
        >
            <Box width={'50%'}>    
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image Available</span>
                    </div>
                )}
            </Box>
            <Box p={'10px'} className="p-4">
                <h2 style={{fontWeight:'bold'}} className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-700">{description}</p>
            </Box>
        </Box>
        
    );
};

export default NewsCard;