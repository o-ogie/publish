class Component {
    state;
    target;
    constructor(_target) {
        this.target = _target;
        this.setup();
        this.render();
        this.setEvent();
    }

    setup() {}
    async render() {
        const a = await this.templete();
        this.target.innerHTML = a;
        console.log("render");
    }

    async templete() {}

    addEvent(type, select, callback) {
        const children = [...document.querySelectorAll(select)];
        const isTarget = (target) => children.includes(target) || target.closest(select);

        this.target.addEventListener(type, (e) => {
            if (!isTarget(e.target)) return false;
            callback(e);
        });
    }

    setstatus(newstate) {
        if (this.state === newstate) return;
        this.state = { ...this.state, ...newstate };
        this.render();
    }
}

export default Component;

