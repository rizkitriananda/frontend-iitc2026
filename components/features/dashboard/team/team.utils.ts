// Fungsi helper efisien untuk mendeteksi keberadaan tim dari data summary
export function checkHasTeam(myTeamsSummary: unknown): boolean {
  if (Array.isArray(myTeamsSummary)) {
    return myTeamsSummary.length > 0;
  }
  if (myTeamsSummary && typeof myTeamsSummary === "object") {
    const summaryData = myTeamsSummary as { data?: unknown[] };
    return Array.isArray(summaryData.data) && summaryData.data.length > 0;
  }
  return false;
}

// Fungsi murni untuk menentukan role user (leader / member)
export function determineUserRole(
  leaderEmail?: string,
  userEmail?: string,
): "leader" | "member" {
  const cleanLeader = leaderEmail?.toLowerCase().trim();
  const cleanUser = userEmail?.toLowerCase().trim();

  return cleanLeader && cleanUser && cleanLeader === cleanUser
    ? "leader"
    : "member";
}
