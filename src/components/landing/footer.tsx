import { useTranslation } from "react-i18next";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Sparkles } from "lucide-react";

const LINK_COLUMNS = [
  {
    titleKey: "footer.productTitle",
    links: [
      { key: "footer.productFeatures", href: "#features" },
      { key: "footer.productCurricula", href: "#curricula" },
      { key: "footer.productPricing", href: "#pricing" },
      { key: "footer.productForParents", href: "#parents" },
      { key: "footer.productForTeachers", href: "#teachers" },
    ],
  },
  {
    titleKey: "footer.companyTitle",
    links: [
      { key: "footer.companyAbout", href: "#about" },
      { key: "footer.companyBlog", href: "#blog" },
      { key: "footer.companyCareers", href: "#careers" },
      { key: "footer.companyContact", href: "#contact" },
    ],
  },
  {
    titleKey: "footer.supportTitle",
    links: [
      { key: "footer.supportHelp", href: "#help" },
      { key: "footer.supportFaq", href: "#faq" },
      { key: "footer.supportPrivacy", href: "#privacy" },
      { key: "footer.supportTerms", href: "#terms" },
    ],
  },
] as const;

// Inline brand glyphs (lucide dropped its deprecated social icons), drawn in
// the same 24px stroke style so they sit naturally next to the rest of the UI.
const socialSvgProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function FacebookIcon() {
  return (
    <svg {...socialSvgProps} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...socialSvgProps} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg {...socialSvgProps} aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg {...socialSvgProps} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "YouTube", icon: YoutubeIcon, href: "https://youtube.com" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
] as const;

// Site footer — dark purple band (fixed hexes on the brand purple family,
// identical in light and dark mode, like the CTA banner) with a white logo
// lockup, link columns, and filled social buttons.
const FOOTER_BG = "#14104A";
const FOOTER_TEXT = "rgba(255, 255, 255, 0.75)";
const FOOTER_DIVIDER = "rgba(255, 255, 255, 0.14)";

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box as="footer" bg={FOOTER_BG} px={{ base: "4", md: "6", lg: "8" }}>
      <Stack maxW="7xl" mx="auto" gap="10" py={{ base: "12", lg: "16" }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "10", lg: "16" }}
          align="flex-start"
        >
          {/* Brand — inline lockup with fixed light colors; the shared <Logo />
              follows the theme's fg token and would go dark-on-dark here. */}
          <Stack gap="4" maxW="sm" flexShrink="0">
            <Flex
              align="center"
              gap="0.5"
              lineHeight="1"
              textStyle="h4"
              fontWeight="bold"
            >
              <Text as="span" color="#FFFFFF">
                Edu
              </Text>
              <Text as="span" color="#A78BFF">
                AI
              </Text>
              <Icon as={Sparkles} boxSize="3.5" color="#A78BFF" aria-hidden="true" />
            </Flex>
            <Text textStyle="caption" color={FOOTER_TEXT}>
              {t("footer.tagline")}
            </Text>

            <HStack gap="2" pt="1">
              {SOCIALS.map((social) => (
                <IconButton
                  key={social.label}
                  asChild
                  aria-label={social.label}
                  size="sm"
                  borderRadius="full"
                  bg="primary.solid"
                  color="#FFFFFF"
                  _hover={{ bg: "#7C5CFF" }}
                >
                  <a href={social.href} target="_blank" rel="noreferrer">
                    <social.icon />
                  </a>
                </IconButton>
              ))}
            </HStack>
          </Stack>

          {/* Link columns */}
          <SimpleGrid columns={{ base: 2, sm: 3 }} gap="8" flex="1" w="full">
            {LINK_COLUMNS.map((column) => (
              <Stack key={column.titleKey} gap="3" align="start">
                <Text
                  textStyle="label"
                  fontWeight="bold"
                  color="#FFFFFF"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
                  {t(column.titleKey)}
                </Text>
                {column.links.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    textStyle="body"
                    color={FOOTER_TEXT}
                    _hover={{ color: "#FFFFFF", textDecoration: "none" }}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </Stack>
            ))}
          </SimpleGrid>
        </Flex>

        {/* Bottom bar */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap="4"
          pt="8"
          borderTopWidth="1px"
          borderColor={FOOTER_DIVIDER}
        >
          <Text textStyle="caption" color={FOOTER_TEXT}>
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </Text>

          <Text textStyle="caption" color={FOOTER_TEXT}>
            {t("footer.madeIn")}
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
}
