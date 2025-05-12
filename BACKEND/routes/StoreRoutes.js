
router.post("/nearby", async (req, res) => {
    const { coordinates, maxDistance = 10000 } = req.body;
  
    if (!coordinates || coordinates.length !== 2) {
      return res.status(400).json({ error: "Invalid coordinates" });
    }
  
    try {
      const stores = await Store.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates
            },
            distanceField: "dist.calculated",
            maxDistance,
            spherical: true
          }
        },
        {
          $group: {
            _id: "$category",
            stores: { $push: "$ROOT" }
          }
        }
      ]);
  
      res.json({ stores });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  export default router;