class Report {
    static myStaticProp = 42;
    static getInstance() {
        if (!(this.instance instanceof this)) {
            this.instance = new this();
            this.instance.install();
          }
          return this.instance;
    }


    install() {
        console.log('hello world');
    }
}

Report.getInstance();
