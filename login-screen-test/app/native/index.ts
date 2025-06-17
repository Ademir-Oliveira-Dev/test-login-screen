import { NativeModules, Platform } from 'react-native';

type OSVersionModule = { getSystemVersion(): Promise<string> };
type ManufacturerModule = { getManufacturer(): Promise<string> };

export default async function getDeviceInfo() {
  if (Platform.OS === 'ios') {
    const { OSVersion } = NativeModules as unknown as {
      OSVersion: OSVersionModule;
    };
    return await OSVersion.getSystemVersion();
  }
  const { Manufacturer } = NativeModules as unknown as {
    Manufacturer: ManufacturerModule;
  };
  return await Manufacturer.getManufacturer();
}
