const scrollPageGetLinks = async (page) => {
    return await page.evaluate(async () => {
     return await new Promise((res, reg) => {
        let totalHeight = 0;
        let distance = 200;
        const gamesLinks = {};
        const config = { childList: true };
        const list = document.querySelector(
          '[data-test-id="virtuoso-item-list"]'
        );
      //   /*********************** */
        const callback = (mutationList, observer) => {
          for (const mutation of mutationList) {
            if (mutation.type === "childList") {
              getLinks();
            }
          }
        };
        const getLinks = () => {
          const listView = document.querySelectorAll('[id$="__match-row"]');
          if (listView) {
            for (i = 0; i < listView.length; i++) {
              link = listView[i]?.firstChild.href;
              gamesLinks[`_${listView[i].id}`] = {link};
            }
            return;
          }
          return;
        };
        const observer = new MutationObserver(callback);
        observer.observe(list, config);
        getLinks();
      //   /*************** */
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
            res(gamesLinks);
          }
        }, 500);
      });
    });
  };
  
  module.exports = scrollPageGetLinks;