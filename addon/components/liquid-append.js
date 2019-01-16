import Component from "@ember/component";
export default Component.extend({
  didUpdateAttrs() {
    //alert("did update attrs");
    return;
    if (this.get("replaceNodes")) {
      //const nodes = this.get("nodes");

      /*       this.$()
        .children()
        .remove(); */
      this.element.innerHTML = "";
      //appending is by reference, as it moves from one dom location to another. Jquery would update the reference, but we have to do it ourselves.
      while (this.nodes.length) this.element.appendChild(this.nodes[0]);

      //update nodes reference
      this.set("nodes", this.element.childNodes);

      /*       for (var i = 0; i < nodes.length; i++) {
        this.element.appendChild(nodes[i]);
      } */
    }
  },

  didInsertElement() {
    const notify = this.get("notify");
    const nodes = this.get("nodes");

    if (notify && notify.willAppendNodes) {
      notify.willAppendNodes(this.element);
    }

    //https://stackoverflow.com/questions/20910147/how-to-move-all-html-element-children-to-another-parent-using-javascript
    //https://stackoverflow.com/questions/8262314/moving-a-dom-element-with-append
    //"If an element selected this way is inserted into a single location elsewhere in the DOM, it will be moved into the target (not cloned):"

    //appending is by reference, as it moves from one dom location to another. Jquery would update the reference, but we have to do it ourselves.
    if (nodes) {
      while (nodes.length) this.element.appendChild(nodes[0]);
      //update nodes reference
      this.set("nodes", this.element.childNodes);
    }

    if (notify && notify.didAppendNodes) {
      notify.didAppendNodes(this.element);
    }
  }
});
