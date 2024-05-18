## Learning points
when working with processes check your .thens and build a sequence of operations to get the desired result.
- two back to back requests to the same endpoint can result in error.
- solution - think about your workflow. Can you put something in between?
```js
// handleDealCards
// create a pile // original 
  // createPile("p1PlatoonPile", p1CardCodes)
  //   .then(() => createPile("p2PlatoonPile", p2CardCodes))

  // @tim - wrap the fetches in a promise and wait for all to resolve before continuing
  // possibly an issue with the the createpile requests happening closely. Added the getP1Platoon cards

```