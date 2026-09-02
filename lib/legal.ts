import { site, t } from "./content";
import type { Lang } from "./routes";

/* Plain-words drafts in the shape a payment gateway asks for. Marked on the
   page as a draft still to be checked by her. */

type Section = { heading: string; body: string[] };

const business = (lang: Lang) => t(site.contact.businessName, lang);

export function legalSections(kind: "privacy" | "terms" | "refund", lang: Lang): Section[] {
  const hi = lang === "hi";

  if (kind === "privacy") {
    return hi
      ? [
          {
            heading: "हम क्या इकट्ठा करते हैं",
            body: [
              "जब आप फ़ॉर्म भरते हैं या व्हाट्सऐप पर लिखते हैं, तो आपका नाम, फ़ोन नंबर, और जो आप अपनी तकलीफ़ के बारे में लिखते हैं, वह हमारे पास आता है। और कुछ नहीं।",
              "क्लास में शामिल होने पर आपकी सेहत से जुड़ी बातें, जो आप खुद बताते हैं, वंदना जी के पास रहती हैं ताकि अभ्यास आपके हिसाब से तय हो सके।",
            ],
          },
          {
            heading: "हम इसका क्या करते हैं",
            body: [
              "सिर्फ़ आपसे बात करने और आपकी क्लास चलाने के लिए। हम आपकी जानकारी न बेचते हैं, न किसी और को देते हैं।",
              "भुगतान का काम [भुगतान सेवा] करती है। कार्ड या यूपीआई की जानकारी हमारे पास नहीं आती।",
            ],
          },
          {
            heading: "वेबसाइट पर",
            body: [
              "हम यह देखने के लिए कि कौन सा पन्ना कितना पढ़ा जाता है, Google Analytics का इस्तेमाल करते हैं। इससे कुछ कुकीज़ बनती हैं। कोई विज्ञापन नहीं, कोई ट्रैकिंग नहीं।",
              "फ़ोटो और वीडियो सिर्फ़ उन विद्यार्थियों के लगाए जाते हैं जिन्होंने अनुमति दी है।",
            ],
          },
          {
            heading: "आपके अधिकार",
            body: [
              `अपनी जानकारी देखने, बदलने या हटवाने के लिए ${site.contact.email} पर लिखिए, या व्हाट्सऐप कीजिए। हम [एक हफ़्ते] में जवाब देते हैं।`,
              `${business("hi")} · [पता], लखनऊ।`,
            ],
          },
        ]
      : [
          {
            heading: "What we collect",
            body: [
              "When you fill the form or write on WhatsApp, we receive your name, your phone number and whatever you tell us about your condition. Nothing else.",
              "Once you join a class, what you tell her about your health stays with her, so the practice can be set to suit you.",
            ],
          },
          {
            heading: "What we do with it",
            body: [
              "Only to speak with you and to run your class. We do not sell your information and we do not pass it to anyone else.",
              "Payments are handled by [payment service]. Card and UPI details never reach us.",
            ],
          },
          {
            heading: "On the website",
            body: [
              "We use Google Analytics to see which pages are read. It sets a few cookies. No advertising, no tracking beyond that.",
              "Photographs and videos of students are published only with their permission.",
            ],
          },
          {
            heading: "Your rights",
            body: [
              `To see, correct or delete what we hold, write to ${site.contact.email} or send a WhatsApp message. We answer within [a week].`,
              `${business("en")} · [address], Lucknow.`,
            ],
          },
        ];
  }

  if (kind === "terms") {
    return hi
      ? [
          {
            heading: "क्लास कैसे चलती है",
            body: [
              "क्लास ज़ूम पर लाइव होती है, [N] लोगों के ग्रुप में। लिंक आपके बैच के व्हाट्सऐप ग्रुप में आता है।",
              "पहली क्लास मुफ़्त है। उसके बाद फ़ीस महीने के हिसाब से है।",
            ],
          },
          {
            heading: "सेहत की बात",
            body: [
              "जुड़ने से पहले अपनी तकलीफ़, चोट, ऑपरेशन, गर्भावस्था या दवा के बारे में ज़रूर बताइए। अभ्यास उसी हिसाब से दिया जाता है।",
              "दवा अपने डॉक्टर की सलाह से ही घटाएँ। योग उसके साथ चलता है, उसकी जगह नहीं लेता।",
              "अगर क्लास के दौरान चक्कर, दर्द या साँस की दिक्कत हो, तो रुक जाइए और वंदना जी को बताइए।",
            ],
          },
          {
            heading: "आपसे उम्मीद",
            body: [
              "क्लास में कैमरा चालू रखिए, ताकि आपको देखा और सुधारा जा सके।",
              "क्लास की रिकॉर्डिंग, स्क्रीनशॉट या लिंक किसी और को न भेजें।",
              "फ़ीस समय पर। नियम [तारीख़] तक।",
            ],
          },
          {
            heading: "बदलाव",
            body: [
              `ये शर्तें ${business("hi")} की हैं। किसी बदलाव की जानकारी व्हाट्सऐप ग्रुप में दी जाती है। कोई भी विवाद लखनऊ की अदालतों के अधिकार क्षेत्र में आएगा।`,
            ],
          },
        ]
      : [
          {
            heading: "How the class runs",
            body: [
              "Classes are live on Zoom, in groups of [N]. The link comes into your batch's WhatsApp group.",
              "The first class is free. After that the fee is charged by the month.",
            ],
          },
          {
            heading: "About your health",
            body: [
              "Before you join, do tell her about any condition, injury, operation, pregnancy or medicine. The practice is set from that.",
              "Reduce medicine only on your doctor's advice. Yoga runs alongside it; it does not replace it.",
              "If you feel dizzy, or a pain, or short of breath during class, stop and tell her.",
            ],
          },
          {
            heading: "What we ask of you",
            body: [
              "Keep your camera on in class, so you can be seen and corrected.",
              "Do not pass on recordings, screenshots or links.",
              "Fees on time, by the [date] of the month.",
            ],
          },
          {
            heading: "Changes",
            body: [
              `These terms are those of ${business("en")}. Any change is announced in the WhatsApp group. Any dispute falls under the courts of Lucknow.`,
            ],
          },
        ];
  }

  return hi
    ? [
        {
          heading: "पहली क्लास मुफ़्त",
          body: [
            "पैसे देने से पहले एक पूरी क्लास मुफ़्त लीजिए। पसंद न आए तो कुछ देना नहीं है।",
          ],
        },
        {
          heading: "महीने की फ़ीस",
          body: [
            "फ़ीस पूरे महीने की होती है, और महीने की शुरुआत में ली जाती है।",
            "[रिफ़ंड का नियम: कितने दिनों में, कितना हिस्सा वापस होता है।]",
            "[अगर वंदना जी किसी वजह से क्लास न ले पाएँ, तो उतने दिन आगे जोड़ दिए जाते हैं।]",
          ],
        },
        {
          heading: "कार्यशाला और व्यक्तिगत सेशन",
          body: [
            "[कार्यशाला की सीट का नियम।]",
            "[व्यक्तिगत सेशन रद्द करने का नियम: कितने घंटे पहले बताना है।]",
          ],
        },
        {
          heading: "पैसे कैसे वापस आते हैं",
          body: [
            `रिफ़ंड उसी तरीके से आता है जिससे भुगतान हुआ था, [7 से 10] कार्य दिवसों में। किसी सवाल के लिए ${site.contact.email} या व्हाट्सऐप।`,
          ],
        },
      ]
    : [
        {
          heading: "The first class is free",
          body: [
            "Take one full class before paying anything. If it is not for you, there is nothing to pay.",
          ],
        },
        {
          heading: "The monthly fee",
          body: [
            "The fee is for a full month and is taken at the start of the month.",
            "[The refund rule: within how many days, and how much comes back.]",
            "[If she cannot take a class, those days are added on at the end.]",
          ],
        },
        {
          heading: "Workshops and private sessions",
          body: [
            "[The rule for a workshop seat.]",
            "[The rule for cancelling a private session: how many hours' notice.]",
          ],
        },
        {
          heading: "How money comes back",
          body: [
            `A refund goes back the same way the payment came, within [7 to 10] working days. For any question write to ${site.contact.email} or send a WhatsApp message.`,
          ],
        },
      ];
}
