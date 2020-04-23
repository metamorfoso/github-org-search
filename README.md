App for searching organizations on Github.

### TODO
- [x] respect github query limitations
  - [x] are longer than 256 characters (not including operators or qualifiers).
- [x] results metadata
  - [x] count
  - [x] showing N of T
- [x] results pagination
  - [x] track github api cursor
  - [x] request next set of results (if enough for another page)
- [x] results filtering
  - [x] by location
  - [x] by website
- [x] figure out how filtering can coexist with pagination (i.e. can only filter what we have at any given point... what happens when we get the next page..?)
  - ideas:
    - show user how many orgs their query returned, and let them request subsequent pages at the top, next to filtering, and **then** when they are done requesting pages, let them filter the results. Something like:
      - [after search] --> "showing N results of T, click to get the next set of M"
      - [when search finished or user satisfied] --> "filter the results"
- tooltip to explain why user has to request sets one by one
- OAuth authentication for each user (I don't wanna deal with my precious token...)
  - need a server for this
