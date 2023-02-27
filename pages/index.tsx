import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { Button, Flex, HStack, Select, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { locale, locales, push } = useRouter();
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={inter.className}>
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
          maxW="5xl"
          mx="auto"
          p={4}
        >
          <Text fontSize="2xl" textTransform="uppercase" letterSpacing="10px">
            {`[${locale}]`} {t("greeting")}
          </Text>
          <Select
            maxW="100px"
            mt={2}
            textTransform="uppercase"
            placeholder="language"
            value={locale}
            onChange={(e) => push("/", undefined, { locale: e.target.value })}
          >
            {locales?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <HStack mt={2}>
            <Button as={Link} href="/about" locale={locale}>
              {t("button")}
            </Button>
            {["mercury", "venus", "earth"].map((item) => (
              <Button
                key={item}
                as={Link}
                href={`/planet/${item}`}
                locale={locale}
                textTransform="capitalize"
              >
                {item}
              </Button>
            ))}
          </HStack>
        </Flex>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<SSRConfig> = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common"])),
    },
  };
};
