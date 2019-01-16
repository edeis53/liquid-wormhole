import { click, findAll, visit } from "ember-native-dom-helpers";
import { startApp, destroyApp } from "../helpers/app-lifecycle";
import {
  injectTransitionSpies,
  ranTransition,
  noTransitionsYet
} from "../helpers/integration";

import { module, test } from "qunit";

let app;

module("Acceptance: Demos", function(hooks) {
  hooks.beforeEach(function() {
    app = startApp();

    // Conceptually, integration tests shouldn't be digging around in
    // the container. But animations are slippery, and it's easier to
    // just spy on them to make sure they're being run than to try to
    // observe their behavior more directly.
    injectTransitionSpies(app);
  });

  hooks.afterEach(function() {
    destroyApp(app);
  });

  test("destination container is cleaned when empty", async function(assert) {
    await visit("/docs");
    await click("#hello-world-button");
    await click("#hello-world-button");

    assert.equal(
      findAll(".default-liquid-destination .liquid-destination-stack").length,
      0,
      "it's empty"
    );
  });

  test("basic liquid-wormhole works correctly and can determine context", async function(assert) {
    await visit("/docs");
    noTransitionsYet(app, assert);

    await click("#hello-world-button");
    assert.equal(
      findAll(".default-liquid-destination .liquid-wormhole-element").length,
      1,
      "it exists"
    );
    ranTransition(app, assert, "wormhole");

    await click("#hello-world-button");
    assert.equal(
      findAll(".default-liquid-destination .liquid-wormhole-element").length,
      0,
      "it closed"
    );
    ranTransition(app, assert, "wormhole");
  });
});
