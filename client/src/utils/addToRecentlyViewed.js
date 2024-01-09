export const addToRecentlyViewed = (album) => {
    let recentlyViewed = [album];
    if (!localStorage.getItem("recentlyViewed")) {
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
        return;
    }
    recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed"));
    console.log(recentlyViewed)
    if (!recentlyViewed.find(a => a._id === album._id)) {
        if (recentlyViewed.length === 5) {
            recentlyViewed.pop();
        }
        recentlyViewed.unshift(album);
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
}