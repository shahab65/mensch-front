import i18next from "i18next";

export const share = (url: string) => {
  const shareData = {
    title: i18next.t("invitationToMensch"),
    url,
  };
  console.log(shareData);
  if (navigator && navigator.share && navigator.canShare(shareData)) {
    navigator.share(shareData);
  } else {
    console.error("The Web Share API is not supported by this browser.");
  }
};
