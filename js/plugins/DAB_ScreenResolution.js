//=============================================================================
// DAB_ScreenResolution.js
//=============================================================================

//=============================================================================
// ** Parameters
//=============================================================================
	
	var Imported = Imported || {};
	Imported.DAB_ScreenResolution = true;
	var Dega = Dega || {}; 
	Dega.SR = Dega.SR || {};

	Dega.parameters = PluginManager.parameters('DAB_ScreenResolution');
	Dega.param = Dega.param || {};

	Dega.param.ScaleBattleback = String(Dega.parameters[''] || true);
	Dega.param.ScaleTitle = String(Dega.parameters[''] || true);
	Dega.param.ScaleGameOver = String(Dega.parameters[''] || true);
	Dega.param.ReposBattlers = String(Dega.parameters[''] || true);
	
//=============================================================================
// Bitmap
//=============================================================================

Dega.SR.Bitmap_initialize = Bitmap.prototype.initialize;
Bitmap.prototype.initialize = function(width, height) {
  Dega.SR.Bitmap_initialize.call(this, width, height);
  this.fontFace = Dega.param.DefaultFont;
};

Dega.SR.Bitmap_blt = Bitmap.prototype.blt;
Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    sx = Math.floor(sx);
    sy = Math.floor(sy);
    sw = Math.floor(sw);
    sh = Math.floor(sh);
    dx = Math.floor(dx);
    dy = Math.floor(dy);
    dw = Math.floor(dw);
    dh = Math.floor(dh);
    Dega.SR.Bitmap_blt.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
};

Dega.SR.Bitmap_fillRect = Bitmap.prototype.fillRect;
Bitmap.prototype.fillRect = function(x, y, w, h, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    Dega.SR.Bitmap_fillRect.call(this, x, y, w, h, c);
};

Dega.SR.Bitmap_gradientFillRect = Bitmap.prototype.gradientFillRect;
Bitmap.prototype.gradientFillRect = function(x, y, w, h, c1, c2, ve) {
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.floor(w);
    h = Math.floor(h);
    Dega.SR.Bitmap_gradientFillRect.call(this, x, y, w, h, c1, c2, ve);
};

Dega.SR.Bitmap_drawCircle = Bitmap.prototype.drawCircle;
Bitmap.prototype.drawCircle = function(x, y, r, c) {
    x = Math.floor(x);
    y = Math.floor(y);
    Dega.SR.Bitmap_drawCircle.call(this, x, y, r, c);
};

Dega.SR.Bitmap_drawText = Bitmap.prototype.drawText;
Bitmap.prototype.drawText = function(text, x, y, mW, l, align) {
    x = Math.floor(x);
    y = Math.floor(y);
    mW = Math.floor(mW);
    l = Math.floor(l);
    Dega.SR.Bitmap_drawText.call(this, text, x, y, mW, l, align);
};

//=============================================================================
// ScreenSprite
//=============================================================================

Dega.SR.ScreenSprite_initialize = ScreenSprite.prototype.initialize;
ScreenSprite.prototype.initialize = function() {
    Dega.SR.ScreenSprite_initialize.call(this);
    this.scale.x = Graphics.boxWidth * 10;
    this.scale.y = Graphics.boxHeight * 10;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.x = 0;
    this.y = 0;
};

//=============================================================================
// Scene_Manager
//=============================================================================

SceneManager._screenWidth  = Number(Dega.parameters['Screen Width'] || 1280);
SceneManager._screenHeight = Number(Dega.parameters['Screen Height'] || 720);
SceneManager._boxWidth     = Number(Dega.parameters['Screen Width'] || 1280);
SceneManager._boxHeight    = Number(Dega.parameters['Screen Height'] || 720);

Dega.SR.SceneManager_run = SceneManager.run;
SceneManager.run = function(sceneClass) {
    Dega.SR.SceneManager_run.call(this, sceneClass);
    if (Utils.isMobileDevice()) return;
    if (Utils.isMobileSafari()) return;
    if (Utils.isAndroidChrome()) return;
    var resizeWidth = Graphics.boxWidth - window.innerWidth;
    var resizeHeight = Graphics.boxHeight - window.innerHeight;
    if (eval(Dega.param.OpenConsole)) this.openConsole();
    if (!Imported.ScreenResolution) {
      window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
      window.resizeBy(resizeWidth, resizeHeight);
    }
};

SceneManager.openConsole = function() {
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      var _debugWindow = require('nw.gui').Window.get().showDevTools();
      _debugWindow.moveTo(0, 0);
      window.focus();
    }
};


//=============================================================================
// Scene_Title
//=============================================================================

Dega.SR.Scene_Title_start = Scene_Title.prototype.start;
Scene_Title.prototype.start = function() {
    Dega.SR.Scene_Title_start.call(this);
    if (eval(Dega.param.ScaleTitle)) this.rescaleTitle();
};

Scene_Title.prototype.rescaleTitle = function() {
    this.rescaleTitleSprite(this._backSprite1);
    this.rescaleTitleSprite(this._backSprite2);
};

Scene_Title.prototype.rescaleTitleSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

//=============================================================================
// Scene_Gameover
//=============================================================================

Dega.SR.Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
    Dega.SR.Scene_Gameover_start.call(this);
    if (eval(Dega.param.ScaleGameOver)) this.rescaleBackground();
};

Scene_Gameover.prototype.rescaleBackground = function() {
    this.rescaleImageSprite(this._backSprite);
};

Scene_Gameover.prototype.rescaleImageSprite = function(sprite) {
    if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    var ratioX = width / sprite.bitmap.width;
    var ratioY = height / sprite.bitmap.height;
    if (ratioX > 1.0) sprite.scale.x = ratioX;
    if (ratioY > 1.0) sprite.scale.y = ratioY;
    this.centerSprite(sprite);
};

Scene_Gameover.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Sprite_Animation.prototype.setupRate = function() {
  this._rate = 4;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

if (!eval(Dega.param.FlashTarget)) {

Dega.SR.Sprite_Battler_updateSelectionEffect =
    Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    if (this._battler.isActor()) {
      Dega.SR.Sprite_Battler_updateSelectionEffect.call(this);
    } else {
      if (this._battler.isSelected()) this.startEffect('whiten');
    }
};

};

//=============================================================================
// Sprite_Actor
//=============================================================================

if (eval(Dega.param.ReposBattlers)) {
  Dega.SR.Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
  Sprite_Actor.prototype.setActorHome = function(index) {
      Dega.SR.Sprite_Actor_setActorHome.call(this, index);
      this._homeX += Graphics.boxWidth - 816;
      this._homeY += Graphics.boxHeight - 624;
  };
};

Sprite_Actor.prototype.retreat = function() {
    this.startMove(1200, 0, 120);
};

//=============================================================================
// Sprite_Enemy
//=============================================================================

if (eval(Dega.param.ReposBattlers)) {
  Dega.SR.Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
  Sprite_Enemy.prototype.setBattler = function(battler) {
      Dega.SR.Sprite_Enemy_setBattler.call(this, battler);
      if (!this._enemy._alteredScreenY) {
        this._homeY += Graphics.boxHeight - 624;
        this._enemy._screenY = this._homeY;
        this._enemy._alteredScreenY = true;
      }
      if ($gameSystem.isSideView()) return;
      if (!this._enemy._alteredScreenX) {
        this._homeX += (Graphics.boxWidth - 816) / 2;
        this._enemy._screenX = this._homeX;
        this._enemy._alteredScreenX = true;
      }
  };
};

//=============================================================================
// Sprite_StateIcon
//=============================================================================

Sprite_StateIcon._iconWidth  = Number(Dega.parameters['Icon Width'] || 32);;
Sprite_StateIcon._iconHeight = Number(Dega.parameters['Icon Height'] || 32);;

//=============================================================================
// Sprite_Button
//=============================================================================

Sprite_Button.prototype.isButtonTouched = function() {
    var x = this.canvasToLocalX(TouchInput.x) + (this.anchor.x * this.width);
    var y = this.canvasToLocalY(TouchInput.y) + (this.anchor.y * this.height);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

if (eval(Dega.param.ScaleBattleback)) {

Dega.SR.Spriteset_Battle_locateBattleback =
    Spriteset_Battle.prototype.locateBattleback;
Spriteset_Battle.prototype.locateBattleback = function() {
    var sprite1 = this._back1Sprite;
    var sprite2 = this._back2Sprite;
    if (sprite1.bitmap.width <= 0) return;
    if (sprite2.bitmap.width <= 0) return;
    if (this._rescaledBattlebackSprite) return;
    this._rescaledBattlebackSprite = true;
    Dega.SR.Spriteset_Battle_locateBattleback.call(this);
    this.rescaleBattlebacks();
};

Spriteset_Battle.prototype.rescaleBattlebacks = function() {
    this.rescaleBattlebackSprite(this._back1Sprite);
    this.rescaleBattlebackSprite(this._back2Sprite);
};

Spriteset_Battle.prototype.rescaleBattlebackSprite = function(sprite) {
  if (sprite.bitmap.width <= 0 || sprite.bitmap <= 0) return;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight;
  var ratioX = width / sprite.bitmap.width;
  var ratioY = height / sprite.bitmap.height;
  if (ratioX > 1.0) {
    sprite.scale.x = ratioX;
    sprite.anchor.x = 0.5;
    sprite.x = width / 2;
  }
  if (ratioY > 1.0) {
    sprite.scale.y = ratioY;
    sprite.origin.y = 0;
    sprite.y = 0;
  }
};

};
//=============================================================================
// Window_BattleLog
//=============================================================================

Window_BattleLog.prototype.showNormalAnimation = function(targets,
animationId, mirror) {
    var animation = $dataAnimations[animationId];
    if (animation) {
      if (animation.position === 3) {
        targets.forEach(function(target) {
            target.startAnimation(animationId, mirror, 0);
        });
      } else {
          var delay = this.animationBaseDelay();
          var nextDelay = this.animationNextDelay();
          targets.forEach(function(target) {
              target.startAnimation(animationId, mirror, delay);
              delay += nextDelay;
          });
      }
    }
}
