# Changelog

## UI 0.1.9

* Scrolling: keep navigation expanded during programmatic positioning and calendar preparation.
* Minimize chrome only in response to scrolling gestures or navigation keys.

## UI 0.1.8

* TabBar: let apps opt into scroll minimization across platforms.
* Share the scroll minimization hook with app toolbars; ignore modal and popup scrolling.

## UI 0.1.7

* Materials: quieter rims and focus wells, neutral grounds with reflected accent.
* Scrolling: respect system scrollbars and provide a shared scroll surface utility.
* Viewports: share keyboard and visual viewport measurements across app shells and sheets.
* Sheets: focus the surface without opening a keyboard unless a child explicitly requests focus.

## UI 0.1.6

* UI: keep popovers and pickers within safe screen edges through one
  placement engine, with scrolling when space is limited.
* Appearance: tint the window ground with the selected accent and add
  a faint sea-salt grain to glass materials.
* Controls: slim focus rings while preserving keyboard focus visibility.

## UI 0.1.5

* UI: add `CompactTimePicker`, a time shown as a button that opens
  columns of hours and minutes, on the locale's 12 or 24 hour clock.
* UI: compact pickers share one anchored placement helper.

## UI 0.1.4

* UI: add `CompactDatePicker`, a date shown as a button that opens a
  month calendar, for dates picked from a calendar (events, invoices).
  Weeks start on the locale's first day; arrow keys, Page Up and Page
  Down move through days and months; optional dates can be removed.

## UI 0.1.3

* UI: guard keyboard navigation in `SearchList` and `TabView` against
  missing items, so apps compiling Hino's source with
  `noUncheckedIndexedAccess` typecheck cleanly.

## UI and TanStack integration 0.1.2

* UI: size TextField Show and Hide controls to their input, retaining
  a 44 pixel touch target on coarse pointers.
* Integration: use a row sized ghost copy button in `SettingList.Copy`
  and expose its size prop.
* Package tooling: use Vite+ lint, formatting and Vitest.

## Repository and website, 2026-10-15

* Develop Hino in its own checkout. Pherus consumes published packages.
* Generate a catalog driven sitemap and advertise it in robots.txt.
* Add page, website, breadcrumb and source project structured data.
* Normalize canonical URLs and keep previews and 404s out of indexing.
* Document standalone setup, architecture, validation, release and deployment.
