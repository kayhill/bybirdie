require('dotenv').config();
const fetch = require('node-fetch');

const eBirdController = {};

const eBirdAPI = {
  headers: { 'X-eBirdApiToken': process.env.EBIRD_API_TOKEN },
  notable_url: 'https://api.ebird.org/v2/data/obs/geo/recent/notable',
  hotspot_url: 'https://api.ebird.org/v2/ref/hotspot/geo',
};

eBirdController.getHotspots = async (req, res, next) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  //console.log(lat, lng);

  const url = eBirdAPI.hotspot_url.concat(
    `?lat=${lat}&lng=${lng}&dist=6&fmt=json`
  );
  const response = await fetch(url, {
    headers: eBirdAPI.headers,
  });
  if (!response.ok) {
    return next({
      log: `eBirdController.getHotspots ERROR: ${response.status}: ${response.statusText}`,
      status: response.status,
      message: {
        err: 'Error in eBirdController.getHotspots. See log for more info.',
      },
    });
  } else {
    const data = await response.json();
    const hotspots = data.map((spot) => {
      const { locName, lat, lng, numSpeciesAllTime } = spot;
      return { locName, lat, lng, numSpeciesAllTime };
    });
    res.locals.hotspots = hotspots;
    return next();
  }
};

// Notable observations can be for locally or nationally rare species or are otherwise unusual, for example over-wintering birds in a species which is normally only a summer visitor.
eBirdController.getNotables = async (req, res, next) => {
  const lat = req.query.lat;
  const lng = req.query.lng;
  //console.log(lat, lng);

  const url = eBirdAPI.notable_url.concat(
    `?lat=${lat}&lng=${lng}&dist=10&fmt=json&maxResults=50`
  );

  const response = await fetch(url, {
    headers: eBirdAPI.headers,
  });
  if (!response.ok) {
    return next({
      log: `eBirdController.getNotables ERROR: ${response.status}: ${response.statusText}`,
      status: response.status,
      message: {
        err: 'Error in eBirdController.getNotables. See log for more info.',
      },
    });
  } else {
    const data = await response.json();
    const notables = data.map((bird) => {
      const { comName, sciName, obsDt, locName, lat, lng } = bird;
      return { comName, sciName, obsDt, locName, lat, lng };
    });
    res.locals.notables = notables;
    return next();
  }
};

module.exports = eBirdController;
