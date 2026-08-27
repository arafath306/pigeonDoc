import { ChangelogVersion } from './types';

export const changelog: ChangelogVersion[] = [
  {
    version: '6.8.1',
    date: '2026-08-27',
    sections: [
      {
        label: 'New',
        items: [
          'Implemented fully dynamic multi-tier verification badges (Blue, Green, Gold) across the entire application interface.'
        ]
      },
      {
        label: 'Fixed',
        items: [
          'Fixed profile badge rendering to dynamically load correct badge colors for verified users instead of hardcoded blue icons.',
          'Added Green badge color support for Government, Media, and official journalistic profiles.',
          'Translated all remaining Bengali text on the Creator Dashboard to English for a clean, global UI.'
        ]
      }
    ]
  },
  {
    version: '6.8.0',
    date: '2026-08-26',
    sections: [
      {
        label: 'New',
        items: [
          'Implemented the new Financial Earnings & Monetization Dashboard with detailed revenue breakdown.',
          'Added a Payout/Withdrawal system with supports for bKash, Nagad, and Bank Transfer with a 24-hour guarantee notice.',
          'Integrated active subscriber history showing joining dates and contributions.',
          'Added a detailed Locked Post unlock history tracker showcasing per-post revenue and unlock logs.'
        ]
      },
      {
        label: 'Fixed',
        items: [
          'Fixed TabBar layout on the monetization dashboard to make it scrollable, preventing label truncation.'
        ]
      }
    ]
  },
  {
    version: '6.7.0',
    date: '2026-08-22',
    sections: [
      {
        label: 'New',
        items: [
          'Added clustered commenter avatars on the feed post cards.',
          'Integrated a professional emoji keyboard for comments and chat.'
        ]
      },
      {
        label: 'Fixed',
        items: [
          'Fixed a bug where downloading media did not save properly to the gallery.',
          'Fixed a bug causing a blank screen and blinking when opening user profiles.'
        ]
      }
    ]
  },
  {
    version: '6.6.0',
    date: '2026-08-21',
    
    sections: [
      {
        label: 'New',
        items: [
          'Added Account Status management to temporarily deactivate or permanently delete accounts.',
          'Added a professional inline search feature in the Settings screen to easily find options.'
        ]
      },
      {
        label: 'Improved',
        items: [
          'Replaced BouncingScrollPhysics with ClampingScrollPhysics across the app for a more standard and professional feel.'
        ]
      }
    ]
  },
  {
    version: '6.5.1',
    date: '2026-08-21',
    tag: 'Latest',
    sections: [
      {
        label: 'Improved',
        items: [
          'Removed rubber-band bouncing and sponge stretching scroll effects across the entire app for a more professional and solid feel.',
          'Replaced BouncingScrollPhysics with ClampingScrollPhysics on all screens (Feed, Settings, Profile, Communities, etc.).'
        ]
      }
    ]
  },
  {
    version: '6.5.0',
    date: '2026-08-19',
    
    sections: [
      {
        label: 'New',
        items: [
          'Added high-performance database indexing configurations designed to scale up to 10M+ users.',
          'Integrated fully automated Vitest coverage checking for React Admin panel helper utilities.',
          'Expanded documentation features page with comprehensive multi-section guides for all 18 features.'
        ]
      },
      {
        label: 'Improved',
        items: [
          'Reached 100% clean analysis and test status on the mobile app, verifying 62/62 tests green.',
          'Added new widget test coverage for the ProfileScreen user interaction state.'
        ]
      },
      {
        label: 'Removed',
        items: [
          'Removed the language switcher selector from the documentation header navigation bar.'
        ]
      }
    ]
  },
  {
    version: '6.4.0',
    date: '2026-08-14',
    sections: [
      {
        label: 'New',
        items: [
          'Introduced support for three verification badge tiers: Personal (Blue), Business (Gold), and Government (Gray).',
          'Added creator monetization dashboard controls to lock threads behind subscriber-only mode.',
          'Implemented native platform screenshot protection blocking capture in chat views.',
          'Added voice posts record composer and inline audio waveform visualiser card.'
        ]
      }
    ]
  },
  {
    version: '4.2.0',
    date: '2026-08-15',
    sections: [
      {
        label: 'New',
        items: [
          'Communities can now pin up to three posts.',
          'Music attachments are available in beta for web users.',
          'New quiet hours controls for notifications.',
        ],
      },
      {
        label: 'Improved',
        items: [
          'For You feed ranking is more responsive to muted topics.',
          'Community moderation queue is faster on large communities.',
          'Messaging load times improved by ~30%.',
        ],
      },
      {
        label: 'Fixed',
        items: [
          'Fixed a layout issue with long usernames on profile pages.',
          'Fixed a bug where draft auto-save could occasionally stall.',
          'Resolved an edge case where poll results lagged behind votes.',
        ],
      },
    ],
  },
  {
    version: '4.1.0',
    date: '2026-07-22',
    sections: [
      {
        label: 'New',
        items: [
          'Voice posts (beta) rolling out to select users.',
          'Organization verification badges now available.',
          'Community rules can be reordered.',
        ],
      },
      {
        label: 'Improved',
        items: [
          'Search results now surface relevant communities first.',
          'Reaction animations are smoother and lighter.',
        ],
      },
      {
        label: 'Fixed',
        items: [
          'Fixed notification badges not clearing on web.',
          'Fixed a crash when opening a community with no posts.',
        ],
      },
    ],
  },
  {
    version: '4.0.0',
    date: '2026-06-30',
    tag: 'Major',
    sections: [
      {
        label: 'New',
        items: [
          'Redesigned For You feed with adjustable signal controls.',
          'Anonymous posting in supported communities.',
          'Premium algorithm priority and advanced analytics.',
        ],
      },
      {
        label: 'Improved',
        items: [
          'Entire app redesigned around the new Pigeon identity.',
          'Dark mode completely reworked for readability.',
        ],
      },
      {
        label: 'Security',
        items: ['Safety number verification now available in all encrypted conversations.'],
      },
    ],
  },
  {
    version: '3.8.1',
    date: '2026-05-18',
    sections: [
      {
        label: 'Fixed',
        items: [
          'Fixed an issue where encrypted group messages could arrive out of order.',
          'Fixed a profile photo upload error on certain mobile devices.',
        ],
      },
      {
        label: 'Improved',
        items: ['Performance improvements across community feeds.'],
      },
    ],
  },
  {
    version: '3.8.0',
    date: '2026-04-29',
    sections: [
      {
        label: 'New',
        items: ['Live polls support up to 6 options.', 'Community moderation queue.'],
      },
      {
        label: 'Improved',
        items: ['Trending topics now resist coordinated manipulation better.'],
      },
    ],
  },
];
