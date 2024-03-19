export const searchValues = (text, searchText) => {
    let points = 0;
    const textLower = text.toLowerCase();
    const searchLower = searchText.toLowerCase();
    
    if (searchLower.length > textLower) {
      return false;
    } else {
      for (let i = 0; i <= textLower.length - 1; i++) {
        if (searchLower.indexOf(textLower[i]) !== -1) {
          points += 1;
        };
      };

      const textLength = textLower.length;
      const percent = (textLength / 100) * points * 100;

      if (percent > 25) {
        return true;
      } else {
        return false;
      };
    };
};