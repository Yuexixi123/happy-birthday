// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if ( dataArr.length === dataArr.indexOf(customData) + 1 ) {
          animationTimeline();
        } 
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

  const tl = new TimelineMax();

  // 启动持续的爱心散落效果
  startContinuousHearts();

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    // 移除这里的单次爱心雨调用
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
      // scale: 0.7
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )
    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )
    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )
    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )
    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )
    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".hat", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    // 添加浪漫爱心环绕效果
    .call(createHeartSurrounding, [], "party")
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    )
    // 添加最终的浪漫文字
    .from(".romantic-message", 1, {
      opacity: 0,
      scale: 0.5,
      ease: Back.easeOut
    }, "+=0.5");

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
  
  // 创建持续的爱心散落效果
  function startContinuousHearts() {
    // 初始创建几个爱心
    createHearts();
    
    // 每隔一段时间创建新的爱心
    setInterval(createHearts, 3000);
  }
  
  // 创建少量爱心
  function createHearts() {
    // 使用document.body而不是container，确保爱心能覆盖整个屏幕
    const body = document.body;
    // 减少爱心数量
    const heartCount = 5;
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.className = "heart-rain";
      heart.innerHTML = "❤";
      
      // 随机位置 - 横向随机，纵向在屏幕各处随机
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      
      heart.style.animationDuration = (Math.random() * 5) + 3 + "s"; 
      heart.style.fontSize = (Math.random() * 15) + 10 + "px"; 
      heart.style.opacity = Math.random() * 0.7 + 0.3;
      heart.style.color = `rgb(${Math.floor(Math.random()*55) + 200}, ${Math.floor(Math.random()*100)}, ${Math.floor(Math.random()*100)})`;
      body.appendChild(heart);
      
      // 自动移除爱心元素
      setTimeout(() => {
        if (heart && heart.parentNode) {
          heart.parentNode.removeChild(heart);
        }
      }, 8000);
    }
  }
  
  // 创建爱心环绕效果
  function createHeartSurrounding() {
    const wishHbd = document.querySelector(".wish-hbd");
    const heartCount = 12;
    const radius = 150;
    
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.className = "heart-surrounding";
      heart.innerHTML = "❤";
      heart.style.color = "#ff1493";
      heart.style.fontSize = "24px";
      heart.style.position = "absolute";
      
      const angle = (i / heartCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      gsap.set(heart, { x, y, opacity: 0 });
      wishHbd.appendChild(heart);
      
      gsap.to(heart, {
        duration: 1,
        opacity: 1,
        ease: "power2.out"
      });
      
      gsap.to(heart, {
        duration: 10,
        rotation: 360,
        repeat: -1,
        ease: "none"
      });
      
      gsap.to(heart, {
        duration: 3,
        x: x * 1.2,
        y: y * 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }
};

// 添加必要的CSS样式
function addRomanticStyles() {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .heart-rain {
      position: fixed;
      pointer-events: none;
      animation: heart-float linear forwards;
      z-index: 9999;
    }
    
    @keyframes heart-float {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      100% {
        transform: translate(${Math.random() > 0.5 ? '+' : '-'}${Math.random() * 100}px, ${Math.random() * 100 + 100}px) rotate(${Math.random() * 360}deg);
        opacity: 0;
      }
    }
    
    /* 其他样式保持不变 */
    .heart-surrounding {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 100;
    }
    
    .romantic-message {
      position: relative;
      text-align: center;
      font-size: 24px;
      color: #ff1493;
      font-family: 'Dancing Script', cursive;
      margin-top: 20px;
      text-shadow: 0 0 10px rgba(255, 20, 147, 0.5);
    }
  `;
  document.head.appendChild(styleEl);
}

// Run fetch and animation in sequence
addRomanticStyles();
fetchData();