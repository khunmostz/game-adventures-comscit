/*:
 * @plugindesc Plugin used to set basic parameters.
 * @author RM CoreScript team
 *
 * @help This plugin does not provide plugin commands.
 *
 * @param alwaysDash
 * @desc To set initial value as to whether the player always dashes. (on/off)
 * @default on
 */
(function() {
    function toNumber(str, def) {
        return isNaN(str) ? def : +(str || def);
    }
    var parameters = PluginManager.parameters('Dash');
    var alwaysDash = parameters['alwaysDash'].toLowerCase() === 'on';


    var _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        if (config['alwaysDash'] === undefined) {
            this.alwaysDash = alwaysDash;
        }
    };
})();