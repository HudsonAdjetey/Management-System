const requestCount =async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const count = await Request.countDocuments({ user: user._id });
    res.json({ requestCount: count });
    // Implement caching mechanism here using Redis or similar technology
    // Store the count in Redis with a key that includes the user ID
    // Set an expiration time for the cache (e.g., 1 hour)
    

}