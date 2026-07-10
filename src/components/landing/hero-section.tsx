import { useRef } from "react";
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
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  Brain,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import mascotImage from "@/assets/eduai-mascot-sitting-desk.png";

const MotionBox = motion.create(Box);

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
// deliberately restrained (no waves/blobs/sparkles) after those read as
// cluttered. `pointerEvents="none"` keeps it from intercepting clicks/taps.
// Intentionally fixed regardless of color mode — the hero keeps this same
// light wash whether the app is in light or dark theme.
function HeroBackground() {
  return (
    <Box
      position="absolute"
      inset="0"
      zIndex="0"
      pointerEvents="none"
      bg="linear-gradient(to bottom left, #FBFAFF 0%, #E9E1FF 50%, #D3C4FF 100%)"
    />
  );
}

// Hero — Phase 1 "Landing Discovery Page" (CLAUDE.md). The outer container
// is taller than the viewport; the inner panel is `position: sticky`, so it
// stays pinned in place while the extra scroll room plays a scale/fade-out
// on the content — the same "pin, then release into the next section" trick
// used on apple.com/apple-vision-pro. Disabled below `lg` (tall pinned
// sections tend to feel janky on mobile scroll), where it behaves as a
// normal, unpinned hero.
export function HeroSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      h={{ base: "auto", lg: "200vh" }}
    >
      <Box
        position={{ base: "static", lg: "sticky" }}
        top="0"
        h={{ base: "auto", lg: "100vh" }}
        overflow="hidden"
        display="flex"
        alignItems="flex-start"
      >
        <HeroBackground />
        <MotionBox
          style={{ scale, opacity, y }}
          position="relative"
          zIndex="1"
          w="full"
          mx="auto"
          maxW="7xl"
          px={{ base: "4", md: "6", lg: "8" }}
          pt={{ base: "12", lg: "16" }}
          pb={{ base: "12", lg: "0" }}
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

              <Text textStyle="bodyLg" color="#64748B" maxW="lg">
                {t("hero.subtitle")}
              </Text>

              <Stack
                direction={{ base: "column", sm: "row" }}
                gap="3"
                w={{ base: "full", sm: "auto" }}
              >
                <Button
                  asChild
                  colorPalette="primary"
                  variant="solid"
                  size="lg"
                >
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
                      borderColor="#FFFFFF"
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
                  <Text textStyle="caption" color="#64748B">
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
                borderColor="#E4E7EC"
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
                    bg="#FFFFFF"
                    color="#64748B"
                    borderWidth="1px"
                    borderColor="#E4E7EC"
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
        </MotionBox>
      </Box>
    </Box>
  );
}
