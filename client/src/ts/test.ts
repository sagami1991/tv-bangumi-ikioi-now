
export class Test {
    private moji: string;
    public setMoji(moji: string){
        this.moji = moji;
    }

    public test() {
        console.log(this.moji);
    }
}