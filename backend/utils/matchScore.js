
function calculateMatchScore(userProfile, eligibility) {
  let score = 0;
  let maxPossibleScore = 100;
  
  if (eligibility.education && eligibility.education.length > 0) {
    if (eligibility.education.includes(userProfile.education)) {
      score += 25;
    } else {
      return 0;
    }
  }
  
  if (eligibility.field && eligibility.field.length > 0) {
    if (eligibility.field.includes(userProfile.field) || eligibility.field.includes('Any')) {
      score += 25;
    }
  }
  
  if (eligibility.state && eligibility.state.length > 0) {
    if (eligibility.state.includes(userProfile.state) || eligibility.state.includes('All India')) {
      score += 20;
    }
  }
  
  if (eligibility.category && eligibility.category.length > 0) {
    if (eligibility.category.includes(userProfile.category) || eligibility.category.includes('All')) {
      score += 15;
    } else if (!eligibility.category.includes('All')) {
      return 0;
    }
  }
  
  if (eligibility.gender && eligibility.gender.length > 0) {
    if (eligibility.gender.includes(userProfile.gender) || eligibility.gender.includes('All')) {
      score += 10;
    } else {
      return 0;
    }
  }
  
  if (eligibility.maxIncome) {
    if (userProfile.income && userProfile.income <= eligibility.maxIncome) {
      score += 5;
    } else if (userProfile.income > eligibility.maxIncome) {
      return 0;
    }
  }
  
  return score;
}

function isEligible(userProfile, eligibility) {
  return calculateMatchScore(userProfile, eligibility) > 0;
}

module.exports = { calculateMatchScore, isEligible };
