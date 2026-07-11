import { useTranslation } from "react-i18next";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import mascotImage from "@/assets/eduai-mascot-sitting-desk.png";

const AVATARS = [
  { name: "Ahmed", colorPalette: "primary" },
  { name: "Sara", colorPalette: "secondary" },
  { name: "Youssef", colorPalette: "success" },
  { name: "Nour", colorPalette: "warning" },
] as const;

const FLOATING_BADGES = [
  {
    key: "hero.badgeAiPowered",
    icon: Brain,
    color: "primary.solid",
    top: "0%",
    insetInlineStart: "36%",
    duration: 3.2,
    delay: 0,
  },
  {
    key: "hero.badgeAllCurriculums",
    icon: BookOpenText,
    color: "success.solid",
    top: "42%",
    insetInlineStart: "-5%",
    duration: 3.6,
    delay: 0.4,
  },
  {
    key: "hero.badgeForAllAges",
    icon: Users,
    color: "warning.solid",
    top: "40%",
    insetInlineEnd: "-4%",
    duration: 3.4,
    delay: 0.8,
  },
] as const;

// Plain, static gradient wash behind the hero content (zIndex 0) — kept
// deliberately restrained (no waves/blobs/sparkles). Theme-aware: a light
// lavender wash in light mode, a deep purple-tinted dark in dark mode.
function HeroBackground() {
  return (
    <Box
      position="absolute"
      inset="0"
      zIndex="0"
      pointerEvents="none"
      bg="linear-gradient(to bottom left, #FBFAFF 0%, #E9E1FF 50%, #D3C4FF 100%)"
      _dark={{
        bg: "linear-gradient(to bottom left, #131024 0%, #1A143A 50%, #251B52 100%)",
      }}
    />
  );
}

// Hero — Phase 1 "Landing Discovery Page" (CLAUDE.md). A normal, unpinned
// section (the earlier scroll-pin effect reserved 200vh and left a large gap
// before the next section, so it was removed); the only remaining motion is
// the gentle float on the mascot's badges.
export function HeroSection() {
  const { t } = useTranslation();

  return (
    <Box as="section" position="relative" overflow="hidden">
      <HeroBackground />
      <Box
        position="relative"
        zIndex="1"
        w="full"
        mx="auto"
        maxW="7xl"
        px={{ base: "4", md: "6", lg: "8" }}
        py={{ base: "12", lg: "16" }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          gap={{ base: "10", lg: "6" }}
        >
          {/* Left: copy */}
          <Stack
            flex="1"
            gap="6"
            align={{ base: "center", lg: "start" }}
            textAlign={{ base: "center", lg: "start" }}
          >
            <HStack
              gap="1.5"
              bg="primary.subtle"
              color="primary.fg"
              borderRadius="full"
              px="3"
              py="1.5"
              textStyle="label"
              fontWeight="medium"
            >
              <Icon as={Sparkles} boxSize="3.5" aria-hidden="true" />
              <Text as="span">{t("hero.badge")}</Text>
            </HStack>

            <Stack gap="0">
              <Text
                as="h1"
                textStyle="h1"
                fontWeight="extrabold"
                color="fg"
                lineHeight="1.1"
              >
                {t("hero.headingLine1")}
              </Text>
              <Text
                as="span"
                textStyle="h1"
                fontWeight="extrabold"
                color="primary.solid"
                lineHeight="1.1"
              >
                {t("hero.headingLine2")}
              </Text>
            </Stack>

            <Text textStyle="bodyLg" color="fg.muted" maxW="lg">
              {t("hero.subtitle")}
            </Text>

            <Stack
              direction={{ base: "column", sm: "row" }}
              gap="3"
              w={{ base: "full", sm: "auto" }}
            >
              <Button asChild colorPalette="primary" variant="solid" size="lg">
                <a href="#signup">
                  {t("hero.ctaPrimary")}
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
            </Stack>

            <HStack gap="3" pt="2">
              <HStack gap="0">
                {AVATARS.map((a, i) => (
                  <Avatar.Root
                    key={a.name}
                    size="sm"
                    colorPalette={a.colorPalette}
                    borderWidth="2px"
                    borderColor="page"
                    ms={i === 0 ? "0" : "-3"}
                  >
                    <Avatar.Fallback name={a.name} />
                  </Avatar.Root>
                ))}
              </HStack>
              <Stack gap="0" align="start">
                <HStack gap="0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      as={Star}
                      boxSize="3.5"
                      color="warning.solid"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </HStack>
                <Text textStyle="caption" color="fg.muted">
                  {t("hero.trustedBy")}
                </Text>
              </Stack>
            </HStack>
          </Stack>

          {/* Right: mascot + floating curriculum badges — hidden on mobile, shown from tablet (md) up */}
          <Box
            display={{ base: "none", md: "block" }}
            position="relative"
            flex="1"
            w="full"
            maxW={{ base: "sm", lg: "none" }}
          >
            <Box
              position="absolute"
              inset="8%"
              borderRadius="full"
              borderWidth="1px"
              borderStyle="dashed"
              borderColor="divider"
              zIndex="0"
            />
            <Image
              src={mascotImage}
              alt=""
              position="relative"
              zIndex="1"
              w="full"
              maxW="1xs"
              mx="auto"
              display="block"
            />

            {FLOATING_BADGES.map((badge) => (
              <motion.div
                key={badge.key}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: badge.duration,
                  delay: badge.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  top: badge.top,
                  insetInlineStart:
                    "insetInlineStart" in badge
                      ? badge.insetInlineStart
                      : undefined,
                  insetInlineEnd:
                    "insetInlineEnd" in badge
                      ? badge.insetInlineEnd
                      : undefined,
                  zIndex: 2,
                }}
              >
                <Badge
                  size="md"
                  bg="surface"
                  color="fg.muted"
                  borderWidth="1px"
                  borderColor="divider"
                  borderRadius="lg"
                  boxShadow="elevation2"
                  px="3"
                  py="3"
                  display="flex"
                  alignItems="center"
                  gap="1"
                  textStyle="sm"
                  fontStyle="italic"
                  letterSpacing="wide"
                  whiteSpace="nowrap"
                >
                  <Icon
                    as={badge.icon}
                    boxSize="5"
                    color={badge.color}
                    aria-hidden="true"
                  />
                  {t(badge.key)}
                </Badge>
              </motion.div>
            ))}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
