'use strict';

/**
 * if VCAP_SERVICES exists then it returns the credentials
 * for the last service that stars with 'name' or {} otherwise
 * @param  String name, service name
 * @return {Object} the service credentials or {} if
 * name is not found in VCAP_SERVICES
 */
module.exports.getCredentials = function(name) {
  if (process.env.VCAP_SERVICES) {
    var services = JSON.parse(process.env.VCAP_SERVICES);
    for (var service_name in services) {
      if (service_name.indexOf(name) === 0) {
        var service = services[service_name][services[service_name].length - 1];
        return service.credentials || {};
      }
    }
  }
  return {};
};
