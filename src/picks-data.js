/* ============================================================
   The Short List: every pick lives here. picks.js builds the page from it.
   Rating rules: docs/rating-guide.md

   To add a pick, copy one entry, change the words, save.

   Fields:
     group    which section: "phones", "screens", "home", or "ease"
     name     card title
     tag      the small label on the cover ("Best for ...")
     cover    teal, terra, mustard, dark, or sand
     icon     flip, simplephone, grandpad, tablet, laptop, display, frame,
              calendar, remote, clock, caption, headset, moon
     format   the short line above the title
     desc     what it is, one or two sentences
     why      "Why it made the list"
     learn    Easy to learn, 1 to 5 (halves allowed: 4.5)
     can      Can do, 1 to 5. Leave it out for single-purpose items.
     link     your affiliate link (one product)
     stores   instead of link: two or more { label, link } places to buy
     options  instead of link: up to three { label, link } choices.
              Labels are checkable facts until you've tested them.
     tested   set to true once you've tested the options yourself;
              removes the "Chosen from buyer reviews" note
     button   custom button text (default "See today's price →")
     paid     set to false for links that earn nothing (no rel="sponsored")
   ============================================================ */

window.SHORT_LIST = {
  // Flip to true the day your first affiliate link goes in. It turns on both
  // commission disclosures and marks links as paid. Leave false until then.
  affiliateLinks: false,

  updated: "October 2026",

  groups: [
    { id: "phones",  label: "Phones",                           heading: "Easy to hold,",  accent: "easy to learn." },
    { id: "screens", label: "Tablets & computers",              heading: "Bigger screens,", accent: "fewer headaches." },
    { id: "home",    label: "Around the house",                 heading: "Family, photos", accent: "and the calendar." },
    { id: "ease",    label: "Easier on the eyes, ears & hands", heading: "Small fixes,",    accent: "big difference." }
  ],

  picks: [
    {
      group: "phones", name: "Lively Jitterbug Flip2", tag: "Best for real buttons", cover: "teal", icon: "flip",
      format: "Flip phone · big backlit buttons",
      desc: "A true flip phone with big buttons you can feel, a loud, clear speaker, and a simple Yes/No menu. An Urgent Response button reaches help with one press (requires a Lively plan).",
      why: "Nothing to swipe, nothing to figure out. Open it, make the call, close it. For anyone who wants a phone that simply acts like a phone.",
      learn: 4.5, can: 2, link: "https://shop.lively.com/products/jitterbug-flip2-flip-phone"
    },
    {
      group: "phones", name: "Apple iPhone with Assistive Access", tag: "Best set up by family", cover: "terra", icon: "simplephone",
      format: "Smartphone · free built-in setting",
      desc: "Assistive Access is a free setting already on every recent iPhone. It turns the screen into a few big, high-contrast buttons for calls, messages, camera and photos, and tucks everything else away.",
      why: "It's still a real iPhone, so FaceTime with the family just works. One honest note: have a family member turn the setting on before handing it over.",
      learn: 3, can: 4, link: "https://www.apple.com/shop/buy-iphone"
    },
    {
      group: "screens", name: "GrandPad", tag: "Best first tablet", cover: "mustard", icon: "grandpad",
      format: "Tablet · plans from $25 a month",
      desc: "Large, color-coded buttons for video calls, photos, email, music and games. It charges by resting on its stand, so there's no tiny cord to fuss with.",
      why: "Only people on a family-approved contact list can call or message it, which shuts the door on scam calls. Know before you buy: the tablet needs a plan. Wi-Fi only is $25 a month, and $45 adds phone calls and cellular data so it works away from home.",
      learn: 5, can: 3.5, link: "https://www.grandpad.net/shop/grandpad-tablet"
    },
    {
      group: "screens", name: "Apple iPad", tag: "Best for family photos", cover: "terra", icon: "tablet",
      format: "Tablet · 10.9-inch screen",
      desc: "A big, bright screen for FaceTime, crosswords, streaming and the web, and it works hand in hand with the iPhone the rest of the family already has.",
      why: "Bigger text, bold fonts, zoom and high contrast are all built in. Turn them on once and the whole tablet gets easier on the eyes.",
      learn: 2.5, can: 5, link: "https://www.apple.com/ipad/"
    },
    {
      group: "screens", name: "Chromebook", tag: "Best with a keyboard", cover: "teal", icon: "laptop",
      format: "Laptop · Lenovo IdeaPad Flex, Acer Chromebook Plus",
      desc: "A real keyboard and screen for email, browsing and YouTube. It starts up in seconds and updates itself quietly in the background. Calls and texts work through Google Voice, a free phone number that takes a few minutes to set up.",
      why: "The usual viruses written for Windows can't run on it. If something ever goes sideways, a reset brings back everything saved to the Google account in minutes.",
      learn: 2.5, can: 5,
      stores: [
        { label: "Shop Chromebooks at Amazon", link: "https://www.amazon.com/s?k=chromebook" },
        { label: "Shop Chromebooks at Best Buy", link: "https://www.bestbuy.com/site/all-laptops/chromebooks/pcmcat244900050010.c?id=pcmcat244900050010" }
      ]
    },
    {
      group: "home", name: "Amazon Echo Show 8", tag: "Best hands-free", cover: "mustard", icon: "display",
      format: "Smart display · 8.7-inch screen",
      desc: "Say \"call Sarah\" and the video call starts. It also shows the time, reminders and a rotating slideshow of family photos.",
      why: "With permission, family can use Drop In to start a video call that connects on its own. No racing across the room to catch the phone.",
      learn: 3.5, can: 3.5,
      stores: [
        { label: "Echo Show 8 at Amazon", link: "https://www.amazon.com/dp/B0DC8ZMR1P" },
        { label: "See every Echo Show size", link: "https://www.amazon.com/s?k=echo+show" }
      ]
    },
    {
      group: "home", name: "Frameo photo frame", tag: "Best for memories", cover: "dark", icon: "frame",
      format: "Wi-Fi photo frame · 10.1-inch touchscreen",
      desc: "Family sends photos and short videos straight from their phones with the free Frameo app, and they just appear on the frame. Nothing to log into, nothing to manage. New grandkid pictures simply show up.",
      why: "My mom lights up every time a new picture of the family appears. She never touches a button. We send, and it's just there.",
      learn: 4.5, link: "https://www.amazon.com/dp/B0D8JDPKKS"
    },
    {
      group: "home", name: "Skylight Calendar", tag: "Best for routines", cover: "sand", icon: "calendar",
      format: "Wall calendar · optional Plus plan, $79 a year",
      desc: "A color-coded touchscreen calendar that shows appointments, reminders and to-do lists right on the wall, where everyone can see them.",
      why: "Family can add a doctor's appointment from their own phone and it appears on the calendar at home. Nothing new to learn for the person reading it. It works without a subscription; the optional Plus plan adds a photo screensaver, meal planning and turning emails into calendar events.",
      learn: 3.5, link: "#"
    },
    {
      group: "ease", name: "Flipper big-button remote", tag: "Best for TV night", cover: "teal", icon: "remote",
      format: "TV remote · six big buttons · family sets it up",
      desc: "Power, channel up and down, volume up and down, and mute. That's the whole remote, with big, high-contrast buttons you can find without your glasses.",
      why: "It can be set to just your favorite channels, so no more landing on a blank \"input\" screen and wondering what happened to the TV. One honest note: programming it to your TV takes a little help the first time.",
      learn: 4, link: "https://flipperremote.com/products/flipper"
    },
    {
      group: "ease", name: "Plain-words day clock", tag: "Best at a glance", cover: "mustard", icon: "clock",
      format: "Day clock · large digital display",
      desc: "A glare-free screen that spells it all out: \"Now it is Wednesday morning, October 14.\" No abbreviations, no squinting at tiny dates.",
      why: "Retirement erases the weekday rhythm, and a long nap can blur 6 AM and 6 PM. This answers \"what day is it?\" from across the room.",
      learn: 4.5,
      stores: [
        { label: "Day and date clock at AlzStore", link: "https://www.alzstore.com/Day-and-Date-Reminder-Clock-for-Memory-Loss-p/0056.htm" },
        { label: "Browse more at Amazon", link: "https://www.amazon.com/s?k=day+date+clock" }
      ]
    },
    {
      group: "ease", name: "Captioned home phone", tag: "Free if you qualify", cover: "terra", icon: "caption",
      format: "Captioned phone · CapTel",
      desc: "A home phone with a screen that shows, in writing, everything the other person says, as they say it. Talk normally and read along whenever a word gets lost.",
      why: "It's paid for by a federal program, so it's free for people with hearing loss. You'll need a hearing professional to sign off and an internet connection at home. We earn nothing on this one.",
      learn: 3.5,
      link: "https://www.captel.com/",
      button: "See how to qualify →", paid: false
    },
    {
      group: "ease", name: "TV listening headset", tag: "Best for clear dialogue", cover: "dark", icon: "headset",
      format: "Wireless TV headset · plugs into your TV",
      desc: "Wireless earphones that bring the voices on TV right to your ears, clear and at your own volume.",
      why: "The TV speakers stay at a normal level for everyone else in the room. It ends the nightly volume tug-of-war.",
      learn: 3.5,
      link: "https://www.amazon.com/s?k=tv+listening+headset",
      button: "Browse options at Amazon →"
    },
    {
      group: "ease", name: "Motion night lights", tag: "Best for nighttime", cover: "sand", icon: "moon",
      format: "Night lights · motion sensing",
      desc: "Set them along the hallway and they glow softly the moment you walk by, then fade off on their own.",
      why: "A soft path of light from bed to bathroom, with no switch to hunt for in the dark. No app, no hub, nothing to set up.",
      learn: 5,
      link: "https://www.amazon.com/s?k=motion+night+lights",
      button: "Browse options at Amazon →"
    }
  ]
};
