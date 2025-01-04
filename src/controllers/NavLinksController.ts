export default class NavLinks {
  public static execute(id: string) {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: "smooth",
      });
      window.history.replaceState(null, "", `/`);
    }
  }
}
