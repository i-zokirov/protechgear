import randomstring from "randomstring";

export default () => {
    return randomstring.generate({
        length: 128,
    })
}

