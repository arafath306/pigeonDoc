export interface SafetyTopic {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
}

export const safetyTopics: SafetyTopic[] = [
  {
    slug: 'privacy-philosophy',
    title: 'Privacy philosophy',
    icon: 'ShieldCheck',
    summary: 'How we think about privacy at Pigeon — and what that means for you in practice.',
    sections: [
      {
        heading: 'Privacy by default',
        body: 'We believe privacy should not be a setting you have to dig for. Pigeon encrypts your messages by default, minimizes the data we collect, and gives you clear controls over what others see.',
      },
      {
        heading: 'What we collect and why',
        body: 'We collect only what we need to make Pigeon work — your account details, the content you post, and limited signals that power your feed. We do not sell your data to third parties.',
        bullets: [
          'Account information — to authenticate you and keep your account secure.',
          'Content you post — to display it and act on moderation.',
          'Limited interaction signals — to personalize your feed.',
        ],
      },
    ],
  },
  {
    slug: 'account-security',
    title: 'Account security',
    icon: 'LockKeyhole',
    summary: 'Practical steps to keep your account safe, and the tools Pigeon provides to help.',
    sections: [
      {
        heading: 'Strong passwords',
        body: 'Use a long, unique password and a password manager. Never reuse your Pigeon password on other services.',
      },
      {
        heading: 'Two-factor authentication',
        body: 'Turn on 2FA from Settings \u2192 Security. We support authenticator apps (recommended) and SMS codes.',
      },
      {
        heading: 'Active sessions',
        body: 'Review the devices logged into your account from Settings \u2192 Security \u2192 Sessions. Log out of anything you do not recognize.',
      },
      {
        heading: 'Phishing',
        body: 'Pigeon will never ask for your password by email or message. If you receive a suspicious message claiming to be from Pigeon, report it and do not click any links.',
      },
    ],
  },
  {
    slug: 'message-encryption',
    title: 'Message encryption',
    icon: 'Lock',
    summary: 'How end-to-end encryption protects your conversations — and what it does and does not cover.',
    sections: [
      {
        heading: 'End-to-end encryption',
        body: 'All messages on Pigeon are end-to-end encrypted. Encryption keys are generated on your device and exchanged securely with your conversation partners. Pigeon cannot read your messages.',
      },
      {
        heading: 'What is covered',
        body: 'Text, images, voice notes, files, and polls sent in private messages are all encrypted.',
      },
      {
        heading: 'What encryption does not do',
        body: 'Encryption does not protect you if your device is compromised, hide who you are messaging from Pigeon\u2019s servers, or prevent someone you message from copying or screenshotting the conversation.',
        bullets: [
          'It does not secure a compromised device.',
          'It does not hide metadata entirely.',
          'It does not stop a contact from screenshotting.',
        ],
      },
      {
        heading: 'Safety numbers',
        body: 'For sensitive conversations, you can verify a safety number with your contact to confirm the encryption has not been tampered with.',
      },
    ],
  },
  {
    slug: 'data-protection',
    title: 'Data protection',
    icon: 'Database',
    summary: 'How your data is stored, what you can control, and how to take it with you.',
    sections: [
      {
        heading: 'Export your data',
        body: 'You can download a copy of your data at any time from Settings \u2192 Privacy \u2192 Export data.',
      },
      {
        heading: 'Delete your data',
        body: 'You can delete your account and associated data from Settings \u2192 Privacy. Deletion is permanent and cannot be undone.',
      },
      {
        heading: 'Data retention',
        body: 'We retain data only as long as needed to provide the service and meet legal obligations. When you delete content, we remove it from our systems within a reasonable period.',
      },
    ],
  },
  {
    slug: 'community-moderation',
    title: 'Community moderation',
    icon: 'Users',
    summary: 'How communities moderate themselves, and how Pigeon supports moderators.',
    sections: [
      {
        heading: 'Community rules',
        body: 'Each community sets its own rules within Pigeon\u2019s platform standards. Moderators enforce these rules and can remove posts or members who violate them.',
      },
      {
        heading: 'Moderation tools',
        body: 'Moderators have access to a moderation queue, member management, pinned posts, and the ability to lock or remove threads.',
      },
      {
        heading: 'Platform standards',
        body: 'All communities must follow Pigeon\u2019s platform standards, which prohibit harassment, hate, illegal content, and other harmful behavior regardless of community rules.',
      },
    ],
  },
  {
    slug: 'reporting',
    title: 'Reporting',
    icon: 'Flag',
    summary: 'How to report content and what happens after you do.',
    sections: [
      {
        heading: 'How to report',
        body: 'Use the Report option on any post, comment, or profile. You can choose a reason and add context.',
      },
      {
        heading: 'What happens next',
        body: 'Reports go to community moderators for community content and to Pigeon for platform-wide violations. We prioritize safety and legal issues. You may not always receive a personal response, but every report is reviewed.',
      },
    ],
  },
  {
    slug: 'blocking',
    title: 'Blocking',
    icon: 'Ban',
    summary: 'How blocking works and what it does.',
    sections: [
      {
        heading: 'Blocking someone',
        body: 'When you block someone, they cannot follow you, message you, or see your posts. They are not notified that you blocked them.',
      },
      {
        heading: 'Unblocking',
        body: 'You can unblock someone at any time from Settings \u2192 Privacy \u2192 Blocked accounts.',
      },
    ],
  },
  {
    slug: 'user-safety',
    title: 'User safety',
    icon: 'ShieldAlert',
    summary: 'Tools and guidance for staying safe on Pigeon, especially for higher-risk users.',
    sections: [
      {
        heading: 'Safety tools',
        body: 'Use blocking, muted words, and privacy controls to shape who can reach you. Enable 2FA and review active sessions regularly.',
        bullets: ['Block and mute accounts', 'Mute words and topics', 'Control who can message you', 'Enable 2FA'],
      },
      {
        heading: 'For higher-risk users',
        body: 'Journalists, activists, and public figures face elevated risk. We recommend verifying safety numbers in sensitive conversations, minimizing personal details on your profile, and reporting credible threats promptly.',
      },
    ],
  },
  {
    slug: 'content-moderation',
    title: 'Content moderation',
    icon: 'ScanSearch',
    summary: 'How Pigeon moderates content across the platform.',
    sections: [
      {
        heading: 'What is not allowed',
        body: 'Pigeon prohibits harassment, hate speech, threats, illegal content, sexualization of minors, and coordinated manipulation. The full policy lives in our Community Standards.',
      },
      {
        heading: 'How we enforce',
        body: 'We combine automated detection, user reports, and human review. Actions range from warnings to permanent account removal, with appeals available for most decisions.',
      },
    ],
  },
  {
    slug: 'verification-safety',
    title: 'Verification',
    icon: 'BadgeCheck',
    summary: 'How verification helps safety and trust on Pigeon.',
    sections: [
      {
        heading: 'Why verification matters',
        body: 'Verification helps users tell the difference between a real public figure or organization and an impostor. It confirms authenticity, not endorsement.',
      },
      {
        heading: 'Free and transparent',
        body: 'Verification is free. We never sell badges. Anyone claiming to sell verification is a scam — report and block them.',
      },
    ],
  },
  {
    slug: 'abuse-prevention',
    title: 'Abuse prevention',
    icon: 'ShieldX',
    summary: 'How Pigeon works to prevent abuse before it spreads.',
    sections: [
      {
        heading: 'Proactive detection',
        body: 'We use automated systems to detect and limit the spread of abusive content, coordinated harassment, and spam before it reaches many people.',
      },
      {
        heading: 'Limits and restrictions',
        body: 'Accounts that repeatedly violate rules may face temporary restrictions on posting or reach. Serious or repeated violations lead to permanent suspension.',
      },
      {
        heading: 'Appeals',
        body: 'Most moderation actions can be appealed. If you believe a decision was wrong, appeal through the notice you received.',
      },
    ],
  },
];
