## API

There are two ways of handling storage in this project. The first one is
to simply communicate with the Radio Browser API (Restful). The second one is to
maintain a local collection of stations and use that instead (localStorage).

Each local collection has a hook that provides the following methods:
 - `getFromStorage()` - returns the collection as a Map
 - `isEmpty()` - returns true if the collection is empty
 - `has(stationId: string)` - returns true if the collection has the given station id
 - `list()` - returns the collection as an array
 - `add(station: Station)` - adds a new station to the collection
 - `remove(stationId: string)` - removes a station from the collection
 - `toggle(station: Station)` - toggles a station in the collection

Each remote endpoint also has a corresponding hook.



