import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Flex, Text, Icon, Link, SimpleGrid, HStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from './components/ui/pagination';

import NewsCard from './newscard';

function App() {

  const [news, setNews] = React.useState([]);
  const [pageRecord, setPageRecord] = useState({
    data: [], 
    currentPagination: 1, 
    limit: 9
  });
  
  const [offset, setOffset] = useState(0);

  const loadNews = (offset = 0) => {
    const url = "https://api.nytimes.com/svc/news/v3/content/all/%22all%22.json?limit=200&api-key=2umRNO4IoGRxodK94vC52gBXhZATzwc7";
    const options = {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
    };

    fetch(url, options).then(
      response => {
        if(response.ok){
          return response.text();
        }
        return response.text().then(err => {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
            errorMessage: err,
          })
        })
      })
      .then(data => {
        const result = JSON.parse(data);
        setOffset(result.results.length)
        setNews((prev) => {
          var updateRecords = [...prev, ...result.results]
          return updateRecords
        })

        setPageRecord((prev) => {
          var currentPageRecord = {...prev};
          currentPageRecord.data = [...result.results.slice((pageRecord.currentPagination - 1) * pageRecord.limit, pageRecord.currentPagination * pageRecord.limit)]
          return currentPageRecord
        })
          
      })
      .catch(err => {
        console.log(err)
      })
    
  }
  
  const changePage = (pageDetail) => {
    setPageRecord((prev) => {
      var currentPageRecord = {...prev};
      debugger;
      currentPageRecord.data = news.slice((pageDetail.page - 1) * pageDetail.pageSize, pageDetail.page * pageDetail.pageSize)
      currentPageRecord.currentPagination = pageDetail.page
      return currentPageRecord
    })
  }
  
  useEffect(() => {
    console.log(pageRecord);
  }, [pageRecord]);

  useEffect(() => {
    loadNews(offset)
  },[])
  
  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <Flex as="header" p={4} align="center" justify="space-between" bg="teal.500" color="white">
        <Text fontSize="2xl" fontWeight="bold">News App</Text>
        <Flex>
          <Link href="https://github.com/MustafaBilwani" isExternal mx={2}>
            <Icon as={FaGithub} boxSize={6} />
          </Link>
        </Flex>
      </Flex>

      {/* Main Content */}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} p={4} gap={6} flex="1">
        {
          pageRecord.data.length > 0 && (
          pageRecord.data.map((x, index) => {
            return(
              <NewsCard title={x.title} description={x.abstract} images={x.multimedia} key={index} />
            )
          })
        )}
      </SimpleGrid>
              
      <PaginationRoot count={200} pageSize={pageRecord.limit} onPageChange={(pageChangeDetails) => {changePage(pageChangeDetails)}} >
          <HStack>
            <PaginationPrevTrigger/>
            <PaginationItems />
            <PaginationNextTrigger/>
          </HStack>
        </PaginationRoot>

      {/* Footer */}
      <Box as="footer" mt={4} p={4} textAlign="center" borderTopWidth="1px" bg="teal.500">
        
      </Box>
    </Flex>
  )
}

export default App
