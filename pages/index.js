import { useState } from "react";
import Head from "next/head";
import NextImage from "next/image";
import {
  chakra,
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Link,
  Input,
  createIcon,
  UnorderedList,
  ListItem,
  Spinner,
  Skeleton
} from "@chakra-ui/react";

const Image = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
    ].includes(prop),
});

const Home = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [gptResponse, setGptResponse] = useState(null);

  const generateAction = async () => {
    //Check for empty book title
    if(input.length < 3 || input.toLowerCase().includes("ignore")) return;
    setGptResponse(null);
    if (isGenerating) return;
    setIsGenerating(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });
    const data = await response.json();
    console.log(data);
    setGptResponse(data);
    setIsGenerating(false);
  };

  const renderModal = () => {
    const genre = gptResponse.Genre;
    const mood = gptResponse.Mood;
    const songs = gptResponse.Songs;
    const listSongs = songs.map((song, i) => {
      const hyper = 'https://www.youtube.com/results?search_query='+song;
      return (
        <ListItem key={i}>
          <Link href={hyper} isExternal>
            <Text key={i}>{song}</Text>
          </Link>
        </ListItem>
      );
    });
    return (
      <Box align={"left"}>
        <Text>Genre: {genre}</Text>
        <Text>Mood: {mood}</Text>
        <UnorderedList>
          {listSongs}
        </UnorderedList>
      </Box>
    );
  };

  //Updates state to update prompt text
  const onChange = (event) => {
    setInput(event.target.value);
  };

  // Closing modal
  const closeModal = () => {
    setGptResponse(null);
    onClose();
  };

  return (
    <div className="root">
      <Head>
        <title>ReadingMood</title>
      </Head>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 4, md: 7 }}
          py={{ base: 4, md: 10 }}
        >
          <Image
            src={"/readingMoodLogo2.png"}
            alt="logo"
            width="500"
            height="500"
            fallbackSrc="https://via.placeholder.com/500"
          />
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          >
            The perfect songs for <br />
            <Text as="b" color={"orange.400"}>
              your book
            </Text>
          </Heading>
          {(!isGenerating && !gptResponse) ? 
          (<Text color={"white.500"}>
            Discover the perfect songs for your next book with our book-song
            matching service. Try it now and experience the emotional connection
            between literature and music like never before. Search for your
            favorite book and get a curated list of songs that relate to both
            the genre and mood. Start your journey now, click the search button
            and let's match your next book with the perfect soundtrack!
          </Text>)
          : ( !gptResponse ? (
              <Skeleton>
                <div>
                  Discover the perfect songs for your next book with our book-song
                  matching service. Try it now and experience the emotional connection
                  between literature and music like never before. Search for your
                  favorite book and get a curated list of songs that relate to both
                  the genre and mood. Start your journey now, click the search button
                  and let's match your next book with the perfect soundtrack!
                </div>
            </Skeleton>
            ) : (
              renderModal()
            ))
          }
          <Stack
            direction={"row"}
            spacing={2}
            width="80%"
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Input
              size="lg"
              placeholder="Your book title"
              onChange={onChange}
              onKeyPress={e=> {
                if (e.key === 'Enter') {
                  generateAction()
                }
             }}
            />
            <Button
              colorScheme={"orange"}
              bg={"orange.400"}
              rounded={"full"}
              px={6}
              isLoading={isGenerating}
              onClick={generateAction}
              _hover={{
                bg: "orange.500",
              }}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Box position={"absolute"} bottom={0} width="100%" color={"gray.200"}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={"column"}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Text>
            © 2023{" "}
            <Link href="https://catacolabs.com" isExternal>
              CatacoLabs
            </Link>
          </Text>
        </Container>
      </Box>
    </div>
  );
};

export default Home;

//https://openlibrary.org/search.json?limit=5&fields=title&title=the+lord+of

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});
