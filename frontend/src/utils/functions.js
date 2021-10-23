export const capsFirstLetter = (str) => {
    //SOME POKEMONS' STATS ARE SEPARATED BY A '-'. THIS FUNCTION ELIMINATES IT AND CAPITALIZES THE FIRST LETTER OF EACH WORD.
    let toCapitalize = str.split(/-/);

    for (let i = 0; i < toCapitalize.length; i++) {
      toCapitalize[i] = toCapitalize[i][0].toUpperCase() + toCapitalize[i].substr(1);
    };

    const joined = toCapitalize.join(' ');

    return joined;
};

export const isEmpty = (obj) => {
    return obj && Object.keys(obj).length === 0;
};