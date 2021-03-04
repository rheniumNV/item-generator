const NDT = require("neodatatree");
const Grabbable = require("neodatatree/components/transform/interaction/grabbable");
const ObjectRoot = require("neodatatree/components/transform/objectRoot");

exports.generateSampleManage = () => {
  const root = new NDT.Slot("Sample");
  NDT.AddComponent(root, new Grabbable());
  NDT.AddComponent(root, new ObjectRoot());

  return NDT.PackItem(root);
};
