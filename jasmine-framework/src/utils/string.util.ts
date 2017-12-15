// interface String {
//     insert: (index: number, subsrting: string) => string;
// }

export class StringUtils extends String {

    static insert(fullString: string, index: number, substring: string) {
        if (index > 0)
            return fullString.substring(0, index) + substring + fullString.substring(index, fullString.length);
        else
            return substring + fullString;
    }
}