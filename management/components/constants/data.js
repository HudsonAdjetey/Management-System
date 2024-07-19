import { Images } from "./img";

const listings = {
  organizations: [
    {
      id: 1,
      type: "Education",
      image: Images.EduAvatar,
    },
    {
      id: 2,
      type: "Healthcare",
      image: Images.HealthcareAvatar,
    },
    {
      id: 3,
      type: "Church",
      image: Images.ChurchAvatar,
    },
    {
      id: 4,
      type: "Sales and Marketing",
      image: Images.chartAvatar,
    },
  ],
  EducationLevels: [
    {
      id: 1,
      level: "Primary",
    },
    {
      id: 2,
      level: "Secondary",
    },
    {
      id: 3,
      level: "High School",
    },
    {
      id: 4,
      level: "College",
    },
  ],
  churchLevels: [
    {
      id: 1,
      level: "Denomination",
    },
    {
      id: 2,
      level: "Orthodox",
    },
    {
      id: 3,
      level: "Catholic",
    },
    {
      id: 4,
      level: "Lutheran",
    },
    {
      id: 5,
      level: "Baptist",
    },
    {
      id: 6,
      level: "Presbyterianism",
    },
    {
      id: 7,
      level: "Methodist",
    },
    {
      id: 8,
      level: "Jehovah's Witnesses",
    },
    {
      id: 9,
      level: "Mennonite",
    },
    {
      id: 10,
      level: "Wesleyan",
    },
    {
      id: 11,
      level: "Adventist",
    },
    {
      id: 12,
      level: "Pentecostal",
    },
    {
      id: 13,
      level: "Reformed",
    },
    {
      id: 14,
      level: "Eastern Orthodox",
    },
  ],
  hospitalLevels: [
    {
      id: 1,
      level: "CHPS Zones",
    },
    {
      id: 2,
      level: "Health Centres/Polyclincs",
    },
    {
      id: 3,
      level: "District Hospitals",
    },
    {
      id: 4,
      level: "Regional Hospitals",
    },
  ],
};

export default listings;
