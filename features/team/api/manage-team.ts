import { api } from "@/lib/api/axios";

export async function deleteTeam() {
  const { data } = await api.delete("/teams/mine");
  return data;
}

export async function leaveTeam() {
  const { data } = await api.delete("/teams/mine/leave");
  return data;
}

export async function removeMember(memberId: string | number) {
  const { data } = await api.delete(`/teams/mine/members/${memberId}`);
  return data;
}
