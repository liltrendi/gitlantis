const KEYS = {
  up1: 87, // W
  up2: 38, // Up
  down1: 83, // S
  down2: 40, // Down
  left1: 65, // A
  left2: 37, // Left
  right1: 68, // D
  right2: 39, // Right
  shift: 16, // Shift
  space: 32, // Space
};

export class MovementControls {
  forward = false;
  backward = false;
  left = false;
  right = false;
  sprint = false;
  jump = false;
  jumpPressed = false;
  isPlayerMoving = false;
  isPlayerMovingVertically = false;

  private keyDown = (e: KeyboardEvent) => {
    if ([KEYS.up2, KEYS.down2].includes(e.keyCode)) e.preventDefault();

    switch (e.keyCode) {
      case KEYS.up1:
      case KEYS.up2:
        this.forward = true;
        this.isPlayerMoving = true;
        this.isPlayerMovingVertically = true;
        break;
      case KEYS.down1:
      case KEYS.down2:
        this.backward = true;
        this.isPlayerMoving = true;
        this.isPlayerMovingVertically = true;
        break;
      case KEYS.left1:
      case KEYS.left2:
        this.left = true;
        this.isPlayerMoving = true;
        break;
      case KEYS.right1:
      case KEYS.right2:
        this.right = true;
        this.isPlayerMoving = true;
        break;
      case KEYS.shift:
        this.sprint = true;
        break;
      case KEYS.space:
        if (!e.repeat) {
          this.jumpPressed = true;
        }
        this.jump = true;
        break;
    }
  };

  private keyUp = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case KEYS.up1:
      case KEYS.up2:
        this.forward = false;
        this.isPlayerMoving =
          this.forward || this.backward || this.left || this.right;
        this.isPlayerMovingVertically = this.forward || this.backward;
        break;
      case KEYS.down1:
      case KEYS.down2:
        this.backward = false;
        this.isPlayerMoving =
          this.forward || this.backward || this.left || this.right;
        this.isPlayerMovingVertically = this.forward || this.backward;
        break;
      case KEYS.left1:
      case KEYS.left2:
        this.left = false;
        this.isPlayerMoving =
          this.forward || this.backward || this.left || this.right;
        this.isPlayerMovingVertically = this.forward || this.backward;
        break;
      case KEYS.right1:
      case KEYS.right2:
        this.right = false;
        this.isPlayerMoving =
          this.forward || this.backward || this.left || this.right;
        this.isPlayerMovingVertically = this.forward || this.backward;
        break;
      case KEYS.shift:
        this.sprint = false;
        break;
      case KEYS.space:
        this.jump = false;
        break;
    }
  };

  joystickMoveForward() {
    this.backward = false;
    this.forward = true;
    this.isPlayerMoving = true;
    this.isPlayerMovingVertically = this.forward || this.backward;
  }

  joystickMoveBackward() {
    this.forward = false;
    this.backward = true;
    this.isPlayerMoving = true;
    this.isPlayerMovingVertically = this.forward || this.backward;
  }

  joystickMoveLeft() {
    this.right = false;
    this.left = true;
    this.isPlayerMoving = true;
  }

  joystickMoveRight() {
    this.left = false;
    this.right = true;
    this.isPlayerMoving = true;
  }

  resetAllMovement() {
    this.forward = false;
    this.backward = false;
    this.left = false;
    this.right = false;
    this.sprint = false;
    this.jump = false;
    this.isPlayerMoving = false;
    this.isPlayerMovingVertically = false;
  }

  attach() {
    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);
  }

  detach() {
    document.removeEventListener("keydown", this.keyDown);
    document.removeEventListener("keyup", this.keyUp);
  }
}
