interface String {
    insert: (index: number, subsrting: string) => string;
}
String.prototype.insert = (index: number, string: string) => {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);
    else
        return string + this;
};

// export class StringUtils extends String {
//     static insert(index: number, substring: string): string {
//         if (index > 0)
//             return this.substring(0, index) + substring + this.substring(index, this.length);
//         else
//             return substring + this;
//     }
// }