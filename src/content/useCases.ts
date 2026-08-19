import { UseCase } from './types';

export const useCases: UseCase[] = [
  {
    slug: 'students',
    name: 'Students',
    icon: 'GraduationCap',
    tagline: 'Study together, share resources, and stay organized.',
    problem:
      'Students scattered across group chats and email threads struggle to keep track of notes, deadlines, and discussions. Important context gets lost, and quieter students never get a chance to participate.',
    howPigeonHelps:
      'Pigeon gives students a dedicated, organized space for each class or interest, with polls for quick decisions, private messaging for group work, and a feed that surfaces relevant resources.',
    featuresUsed: ['Communities', 'Live Polls', 'Encrypted Messaging', 'Posts', 'Drafts'],
    workflow: [
      { title: 'Create a study community', description: 'Set up a community for your class or study group with clear rules and pinned resources.' },
      { title: 'Share resources', description: 'Post notes, links, and past papers so everyone can find them in one place.' },
      { title: 'Run polls', description: 'Use polls to pick a study time, decide on a topic, or gather quick opinions.' },
      { title: 'Discuss privately', description: 'Use encrypted messaging for group projects and sensitive conversations.' },
      { title: 'Discover content', description: 'Follow related communities and topics to find useful material beyond your circle.' },
    ],
    benefits: [
      'All class discussions and resources in one searchable place.',
      'Quieter students can participate through posts and polls.',
      'Private group work stays private with end-to-end encryption.',
      'Less noise than a fragmented group chat.',
    ],
  },
  {
    slug: 'creators',
    name: 'Creators',
    icon: 'Palette',
    tagline: 'Build an audience and grow sustainably.',
    problem:
      'Creators on ad-driven platforms are pressured to chase controversy and volume. They lack direct relationships with their audience and have limited tools to grow on their own terms.',
    howPigeonHelps:
      'Pigeon gives creators a community-first home, analytics to understand their audience, verification to prove authenticity, and Premium tools to grow sustainably without ads.',
    featuresUsed: ['Creator Features', 'Communities', 'Verification', 'Premium', 'Posts', 'Algorithm Priority'],
    workflow: [
      { title: 'Build an audience', description: 'Post consistently to your profile and relevant communities to attract followers.' },
      { title: 'Publish content', description: 'Use rich posts with media, polls, and music to keep your audience engaged.' },
      { title: 'Get verified', description: 'Apply for creator verification to confirm your identity and stand out.' },
      { title: 'Build a community', description: 'Create a dedicated community for your most engaged followers.' },
      { title: 'Use Premium', description: 'Unlock analytics, scheduling, and algorithm priority to grow faster.' },
      { title: 'Engage your audience', description: 'Use polls, reactions, and comments to build a two-way relationship.' },
    ],
    benefits: [
      'A home you control, not an algorithm you fight.',
      'Direct relationship with your audience through communities.',
      'Sustainable growth without chasing outrage.',
      'Clear analytics to understand what resonates.',
    ],
  },
  {
    slug: 'communities',
    name: 'Communities',
    icon: 'Users',
    tagline: 'Run a healthy, organized community.',
    problem:
      'Community leaders juggle moderation, rules, member conflicts, and growth — often with blunt tools that make it hard to keep conversations healthy.',
    howPigeonHelps:
      'Pigeon communities come with clear rules, moderation tools, member management, polls, and a dedicated feed so you can shape the culture you want.',
    featuresUsed: ['Communities', 'Moderation', 'Live Polls', 'Posts', 'Notifications'],
    workflow: [
      { title: 'Create your community', description: 'Pick a name, description, and membership type that fits your goals.' },
      { title: 'Set rules', description: 'Write 3–6 clear rules that set expectations from the first post.' },
      { title: 'Moderate', description: 'Use moderation tools to handle reports, remove content, and guide tone.' },
      { title: 'Manage members', description: 'Approve joins, assign moderators, and handle conflicts fairly.' },
      { title: 'Run discussions and polls', description: 'Use polls and pinned posts to steer conversation and gather input.' },
      { title: 'Grow', description: 'Promote your community and welcome new members with an intro thread.' },
    ],
    benefits: [
      'Clear structure keeps discussions focused.',
      'Moderation tools scale as your community grows.',
      'Polls make it easy to involve members in decisions.',
      'A dedicated space with its own culture and norms.',
    ],
  },
  {
    slug: 'businesses',
    name: 'Businesses',
    icon: 'Briefcase',
    tagline: 'Reach customers where they gather.',
    problem:
      'Businesses struggle to build genuine relationships with customers on platforms built for ads, not community. Announcements get lost and feedback is hard to gather.',
    howPigeonHelps:
      'Pigeon gives businesses a verified presence, a community to gather customers, announcement tools, and direct encrypted messaging for support.',
    featuresUsed: ['Business Verification', 'Communities', 'Posts', 'Encrypted Messaging', 'Live Polls'],
    workflow: [
      { title: 'Build your presence', description: 'Create a verified business profile so customers know it is really you.' },
      { title: 'Communicate with customers', description: 'Use encrypted messaging for support and account questions.' },
      { title: 'Build a community', description: 'Create a community around your product or industry.' },
      { title: 'Make announcements', description: 'Pin announcements and share updates that reach your whole audience.' },
      { title: 'Engage your audience', description: 'Use polls and reactions to gather feedback and run discussions.' },
      { title: 'Get verified', description: 'Apply for business verification to confirm authenticity.' },
    ],
    benefits: [
      'A verified, trusted presence customers recognize.',
      'Direct, encrypted customer communication.',
      'A community that turns customers into advocates.',
      'Structured announcements that do not get buried.',
    ],
  },
  {
    slug: 'organizations',
    name: 'Organizations',
    icon: 'Building2',
    tagline: 'Coordinate, inform, and grow your group.',
    problem:
      'Schools, clubs, NGOs, and media organizations rely on scattered tools — email lists, group chats, social pages — that fragment communication and make coordination slow.',
    howPigeonHelps:
      'Pigeon gives organizations a single space to post updates, run discussions, gather input through polls, and coordinate privately — all with a verified presence.',
    featuresUsed: ['Communities', 'Verification', 'Posts', 'Live Polls', 'Encrypted Messaging'],
    workflow: [
      { title: 'Set up your organization', description: 'Create a verified organization profile and one or more communities.' },
      { title: 'Inform members', description: 'Pin announcements and post updates that reach everyone.' },
      { title: 'Gather input', description: 'Use polls for decisions, feedback, and event planning.' },
      { title: 'Coordinate privately', description: 'Use encrypted messaging for leadership and sensitive discussions.' },
      { title: 'Grow your reach', description: 'Promote your community to attract new members and supporters.' },
    ],
    benefits: [
      'One organized space instead of scattered channels.',
      'Verified presence builds trust with members and the public.',
      'Polls make decisions transparent and inclusive.',
      'Private coordination stays private.',
    ],
  },
  {
    slug: 'everyday-users',
    name: 'Everyday Users',
    icon: 'User',
    tagline: 'Keep in touch and find your people.',
    problem:
      'Most social platforms are overwhelming, ad-driven, and built around strangers shouting. Everyday users just want to keep up with friends, find interesting conversations, and share what is on their mind.',
    howPigeonHelps:
      'Pigeon keeps things simple — a feed of people and topics you care about, communities for your interests, encrypted messaging for real conversations, and trending topics to discover what is happening.',
    featuresUsed: ['Feed', 'Communities', 'Messaging', 'Posts', 'Trending Topics'],
    workflow: [
      { title: 'Share your thoughts', description: 'Post to your profile or a community in seconds.' },
      { title: 'Connect with friends', description: 'Follow people you know and message them privately.' },
      { title: 'Join communities', description: 'Find communities for your hobbies and interests.' },
      { title: 'Message privately', description: 'Use encrypted messaging for one-on-one and small group chats.' },
      { title: 'Discover trending topics', description: 'See what people are talking about across Pigeon.' },
      { title: 'Join discussions', description: 'Comment, react, and vote in polls to participate.' },
    ],
    benefits: [
      'A calmer, more relevant feed.',
      'Real conversations with people you care about.',
      'Communities that match your interests.',
      'Privacy by default, not as an afterthought.',
    ],
  },
];
