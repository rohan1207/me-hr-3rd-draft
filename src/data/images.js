/** Local me-HR photography & brand assets (from /public). */
export const images = {
 logo: "/logo1.png",
 founder: "/sonia_patra.jpeg",
 founderAlt: "/patra.jpg",
 team: "/me-hr_team.jpg",
 teamAlt: "/img3.jpg",
 meeting: "/me-hr_meeting.jpeg",
 meetingAlt: "/img.jpg",
 boardroom: "/team_meet.jpeg",
 office: "/img1.jpeg",
 collage: "/img2.jpg",
};

/** Rotating pool for cards, galleries, heroes, repetition is fine. */
export const photoPool = [
 images.team,
 images.meeting,
 images.boardroom,
 images.meetingAlt,
 images.teamAlt,
 images.founderAlt,
 images.collage,
 images.office,
 images.founder,
];

export function photoAt(i = 0) {
 return photoPool[i % photoPool.length];
}
