const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

// Limit Metro to the mobile package only (no parent node_modules)
config.watchFolders = [projectRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules')
];

// Prevent Metro from walking up to parent node_modules
config.resolver.disableHierarchicalLookup = true;

module.exports = withNativeWind(config, { input: './global.css' })