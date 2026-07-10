import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const MotionBox = motion.create(Box);

const NOTES = ["cta.note1", "cta.note2", "cta.note3"] as const;

// Closing call-to-action — a full-width brand-gradient banner. Like the hero
// background, the gradient uses fixed brand hexes (built on primary #6C4CFF)
// so it looks identical in light and dark mode; the text on it is therefore
// fixed white as well.
export function CtaSection() {
  const { t } = useTranslation();

  return (
    <Box
      id="signup"
      as="section"
      bg="page"
      py={{ base: "16", lg: "24" }}
      px={{ base: "4", md: "6", lg: "8" }}
    >
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        maxW="7xl"
        mx="auto"
      >
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="2xl"
          bg="linear-gradient(135deg, #7C5CFF 0%, #6C4CFF 45%, #4B2ED9 100%)"
          boxShadow="elevation4"
          px={{ base: "6", md: "12", lg: "20" }}
          py={{ base: "12", md: "16", lg: "20" }}
        >
          {/* Soft decorative rings, clipped by the banner's rounded corners */}
          <Box
            position="absolute"
            top="-30%"
            insetInlineEnd="-10%"
            boxSize="24rem"
            borderRadius="full"
            borderWidth="2px"
            borderColor="rgba(255, 255, 255, 0.12)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            bottom="-40%"
            insetInlineStart="-8%"
            boxSize="20rem"
            borderRadius="full"
            borderWidth="2px"
            borderColor="rgba(255, 255, 255, 0.1)"
            pointerEvents="none"
          />

          <Stack
            position="relative"
            zIndex="1"
            gap="6"
            align="center"
            textAlign="center"
          >
            <Text
              as="h2"
              textStyle="h1"
              fontWeight="extrabold"
              color="#FFFFFF"
              lineHeight="1.15"
            >
              {t("cta.heading")}
            </Text>

            <Text
              textStyle="bodyLg"
              color="rgba(255, 255, 255, 0.85)"
              maxW="2xl"
            >
              {t("cta.subtitle")}
            </Text>

            <Button
              asChild
              size="xl"
              bg="#FFFFFF"
              color="#4B2ED9"
              borderRadius="md"
              fontWeight="bold"
              _hover={{ bg: "#F1EDFF" }}
              boxShadow="elevation2"
            >
              <a href="#signup">
                {t("cta.button")}
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>

            <Flex
              wrap="wrap"
              justify="center"
              columnGap="6"
              rowGap="2"
              pt="1"
            >
              {NOTES.map((note) => (
                <HStack key={note} gap="1.5">
                  <Icon
                    as={Check}
                    boxSize="4"
                    color="rgba(255, 255, 255, 0.9)"
                    aria-hidden="true"
                  />
                  <Text textStyle="caption" color="rgba(255, 255, 255, 0.85)">
                    {t(note)}
                  </Text>
                </HStack>
              ))}
            </Flex>
          </Stack>
        </Box>
      </MotionBox>
    </Box>
  );
}
