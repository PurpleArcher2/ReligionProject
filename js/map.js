// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded, initializing map...");

  try {
    // Initialize map centered on Israel
    const map = L.map("map", {
      zoomControl: true, // Ensure zoom controls are visible
      attributionControl: true, // Ensure attribution is visible
    }).setView([31.7683, 35.2137], 7);

    console.log("Map initialized");

    // Add ESRI World Street Map with English labels
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      {
        attribution:
          "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
        maxZoom: 18,
      }
    ).addTo(map);

    console.log("Tile layer added");

    // Define categories with colors
    const categories = {
      "Birth & Early Life": "#e41a1c",
      "Baptism & Temptation": "#377eb8",
      "Ministry in Galilee": "#4daf4a",
      "Ministry in Judea": "#984ea3",
      "Passion Week": "#ff7f00",
      "Resurrection & Ascension": "#d6d600",
    };

    // Initialize marker storage by category
    const markersByCategory = {};
    Object.keys(categories).forEach((category) => {
      markersByCategory[category] = [];
    });

    // Define locations with their coordinates and descriptions
    const locations = [
      {
        id: 1,
        name: "Bethlehem",
        coordinates: [31.7054, 35.2072],
        description:
          "Jesus was born in Bethlehem to fulfill the prophecy in Micah 5:2. Mary and Joseph traveled there for a census ordered by Caesar Augustus. Jesus was born in humble conditions, placed in a manger, and visited by shepherds who were told of his birth by angels.",
        category: "Birth & Early Life",
        references: "Matthew 2:1-12, Luke 2:1-20",
        videoUrl: "./assets/Christmas_video.mp4",
      },
      {
        id: 2,
        name: "Nazareth",
        coordinates: [32.7021, 35.303],
        description:
          "Jesus' hometown where he grew up with Mary and Joseph after returning from Egypt. He spent his childhood and early adult years here as a carpenter. Later, when he returned to preach in the synagogue, he was rejected by the townspeople.",
        category: "Birth & Early Life",
        references: "Matthew 2:23, Luke 2:39-40, Mark 6:1-6",
        videoUrl: "./assets/carpenter.mp4",
      },
      {
        id: 3,
        name: "Jerusalem (Temple)",
        coordinates: [31.7781, 35.2353],
        description:
          "At age 12, Jesus was found in the Temple discussing scripture with religious teachers, astonishing them with his understanding. As an adult, he cleansed the Temple twice by driving out merchants and money changers who were defiling the sacred space.",
        category: "Birth & Early Life",
        references: "Luke 2:41-52, John 2:13-22, Matthew 21:12-17",
        videoUrl: "./assets/temple.mp4",
      },
      {
        id: 4,
        name: "Jordan River",
        coordinates: [32.1021, 35.5497],
        description:
          "Jesus was baptized by John the Baptist in the Jordan River. At his baptism, the heavens opened, the Holy Spirit descended like a dove, and God's voice proclaimed, 'This is my beloved Son, with whom I am well pleased.'",
        category: "Baptism & Temptation",
        references: "Matthew 3:13-17, Mark 1:9-11, Luke 3:21-22",
        videoUrl: "./assets/baptism.mp4",
      },
      {
        id: 5,
        name: "Wilderness of Judea",
        coordinates: [31.8242, 35.3625],
        description:
          "After his baptism, Jesus spent 40 days fasting in the wilderness where he was tempted by Satan. He faced three major temptations but overcame each one by quoting scripture, demonstrating perfect obedience to God's will.",
        category: "Baptism & Temptation",
        references: "Matthew 4:1-11, Mark 1:12-13, Luke 4:1-13",
        videoUrl: "./assets/temptation.mp4",
      },
      {
        id: 6,
        name: "Capernaum",
        coordinates: [32.881, 35.575],
        description:
          "Jesus made this fishing village his ministry headquarters in Galilee. Here he called several disciples, healed many people (including a centurion's servant and Peter's mother-in-law), taught in the synagogue, and delivered many parables.",
        category: "Ministry in Galilee",
        references: "Matthew 4:13, Mark 1:21-34, Luke 4:31-41",
        videoUrl: "./assets/cure.mp4",
      },
      {
        id: 7,
        name: "Sea of Galilee",
        coordinates: [32.8238, 35.583],
        description:
          "Jesus performed many miracles here, including calming a storm, walking on water, and the miraculous catch of fish. He called his first disciples by these shores and taught large crowds from a boat just offshore.",
        category: "Ministry in Galilee",
        references: "Matthew 8:23-27, 14:22-33, Luke 5:1-11, Mark 4:1-9",
        videoUrl: "./assets/calmsea.mp4",
      },
      {
        id: 8,
        name: "Mount of Beatitudes",
        coordinates: [32.8808, 35.5556],
        description:
          "Site of Jesus' famous Sermon on the Mount, where he delivered the Beatitudes and many core teachings of Christian ethics. Here he taught about being salt and light, the fulfillment of the law, prayer, fasting, and treating others.",
        category: "Ministry in Galilee",
        references: "Matthew 5-7",
        videoUrl: "./assets/advice.mp4",
      },
      {
        id: 9,
        name: "Cana",
        coordinates: [32.75, 35.3333],
        description:
          "Jesus performed his first recorded miracle here at a wedding feast, turning water into wine when the hosts ran out. This miracle revealed his glory and caused his disciples to put their faith in him.",
        category: "Ministry in Galilee",
        references: "John 2:1-11",
        videoUrl: "./assets/wine.mp4",
      },
      {
        id: 10,
        name: "Nain",
        coordinates: [32.6306, 35.3486],
        description:
          "Jesus encountered a funeral procession for the only son of a widow. Moved with compassion, he raised the young man from the dead and restored him to his mother, causing great awe among the witnesses.",
        category: "Ministry in Galilee",
        references: "Luke 7:11-17",
        videoUrl: "./assets/deadman.mp4",
      },
      {
        id: 11,
        name: "Bethsaida",
        coordinates: [32.9076, 35.6296],
        description:
          "Jesus healed a blind man here and performed the miracle of feeding 5,000 people with just five loaves and two fish in a nearby area. This was the hometown of the disciples Philip, Andrew, and Peter.",
        category: "Ministry in Galilee",
        references: "Mark 8:22-26, Luke 9:10-17",
      },
      {
        id: 12,
        name: "Mount Tabor (Transfiguration)",
        coordinates: [32.6817, 35.3917],
        description:
          "Traditionally identified as the Mount of Transfiguration, where Jesus' appearance was transformed, his face shining like the sun and clothes becoming white as light. Moses and Elijah appeared, and God's voice proclaimed Jesus as his Son.",
        category: "Ministry in Galilee",
        references: "Matthew 17:1-9, Mark 9:2-8, Luke 9:28-36",
      },
      {
        id: 13,
        name: "Samaria (Jacob's Well)",
        coordinates: [32.2133, 35.285],
        description:
          "Jesus encountered a Samaritan woman at Jacob's Well. Breaking social norms by speaking with her, he revealed her life story and offered 'living water.' Many Samaritans believed in him after this encounter.",
        category: "Ministry in Judea",
        references: "John 4:1-42",
      },
      {
        id: 14,
        name: "Bethany",
        coordinates: [31.7737, 35.2633],
        description:
          "Home of Mary, Martha, and Lazarus, close friends of Jesus. Here Jesus raised Lazarus from the dead after he had been in the tomb for four days, one of his most dramatic miracles. Mary also anointed Jesus' feet here.",
        category: "Ministry in Judea",
        references: "John 11:1-44, John 12:1-8",
      },
      {
        id: 15,
        name: "Jericho",
        coordinates: [31.8468, 35.4442],
        description:
          "Jesus healed blind Bartimaeus on the road to Jericho. In the city, he called to Zacchaeus, a tax collector who had climbed a sycamore tree to see him. Jesus' visit brought salvation to Zacchaeus' household.",
        category: "Ministry in Judea",
        references: "Mark 10:46-52, Luke 19:1-10",
      },
      {
        id: 16,
        name: "Bethphage (Triumphal Entry)",
        coordinates: [31.7761, 35.2472],
        description:
          "Starting point of Jesus' triumphal entry into Jerusalem on Palm Sunday. He sent disciples to find a donkey, fulfilling Zechariah's prophecy. Crowds welcomed him with palm branches and shouts of 'Hosanna!'",
        category: "Passion Week",
        references:
          "Matthew 21:1-11, Mark 11:1-11, Luke 19:28-44, John 12:12-19",
      },
      {
        id: 17,
        name: "Mount of Olives",
        coordinates: [31.7788, 35.2425],
        description:
          "Jesus often retreated here to pray and teach. He delivered the Olivet Discourse here, prophesying about the destruction of the Temple and end times. Later, he ascended to heaven from this location.",
        category: "Passion Week",
        references: "Matthew 24-25, Luke 21:5-38, Acts 1:9-12",
      },
      {
        id: 18,
        name: "Garden of Gethsemane",
        coordinates: [31.7797, 35.2402],
        description:
          "Jesus prayed in deep anguish the night before his crucifixion, saying 'Not my will, but yours be done.' His disciples fell asleep despite his request to keep watch. Judas betrayed him here with a kiss, leading to his arrest.",
        category: "Passion Week",
        references:
          "Matthew 26:36-56, Mark 14:32-52, Luke 22:39-53, John 18:1-11",
      },
      {
        id: 19,
        name: "Golgotha (Calvary)",
        coordinates: [31.7781, 35.2295],
        description:
          "The 'Place of the Skull' where Jesus was crucified between two criminals. Despite his suffering, he forgave his executioners, promised paradise to a repentant thief, and ensured care for his mother. Here he declared 'It is finished.'",
        category: "Passion Week",
        references:
          "Matthew 27:33-56, Mark 15:22-41, Luke 23:33-49, John 19:17-37",
      },
      {
        id: 20,
        name: "Garden Tomb",
        coordinates: [31.7835, 35.2297],
        description:
          "One proposed site of Jesus' burial and resurrection. On the third day, women discovered the stone rolled away and the tomb empty. Jesus appeared to Mary Magdalene, who at first mistook him for a gardener.",
        category: "Resurrection & Ascension",
        references: "Matthew 28:1-10, Mark 16:1-8, Luke 24:1-12, John 20:1-18",
      },
      {
        id: 21,
        name: "Emmaus Road",
        coordinates: [31.837, 35.1079],
        description:
          "After his resurrection, Jesus walked with two disciples who didn't recognize him. He explained how scripture pointed to him, and they finally recognized him when he broke bread. They rushed back to Jerusalem to share the news.",
        category: "Resurrection & Ascension",
        references: "Luke 24:13-35",
      },
      {
        id: 22,
        name: "Sea of Galilee (Post-Resurrection)",
        coordinates: [32.8338, 35.583],
        description:
          "Jesus appeared to seven disciples who were fishing. After another miraculous catch, they shared breakfast on the shore. Here Jesus restored Peter with the threefold question 'Do you love me?' and command to 'Feed my sheep.'",
        category: "Resurrection & Ascension",
        references: "John 21:1-23",
      },
      {
        id: 23,
        name: "Mount of Olives (Ascension)",
        coordinates: [31.7788, 35.2425],
        description:
          "Forty days after his resurrection, Jesus led his disciples to the Mount of Olives. After giving them final instructions to be his witnesses, he was taken up to heaven while they watched. Angels promised he would return the same way.",
        category: "Resurrection & Ascension",
        references: "Acts 1:6-12",
      },
    ];

    console.log("Adding markers to map...");

    // Add markers for each location
    locations.forEach((location) => {
      // Create custom marker with number and category color
      const markerColor = categories[location.category];
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: location.id,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      });

      // Create and add marker
      const marker = L.marker(location.coordinates, {
        icon: customIcon,
        title: location.name,
      }).addTo(map);

      // Store the marker in the appropriate category array
      markersByCategory[location.category].push(marker);

      // Set marker background color based on category
      marker.getElement().style.backgroundColor = markerColor;

      // Add permanent tooltip with location name in English
      marker.bindTooltip(location.name, {
        permanent: false,
        direction: "top",
        className: "custom-tooltip",
      });

      // Add click event to open modal
      marker.on("click", function () {
        document.getElementById(
          "modalTitle"
        ).innerText = `${location.id}. ${location.name}`;
        document.getElementById("modalText").innerText = location.description;
        document.getElementById(
          "references"
        ).innerHTML = `<p><strong>Biblical References:</strong> ${location.references}</p>`;

        // Update video container with video element
        const videoContainer = document.getElementById("videoContainer");
        if (location.videoUrl) {
          videoContainer.innerHTML = `
              <video autoplay muted loop>
              <source src="${location.videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
              </video>`;
        } else {
          videoContainer.innerHTML = `<p>No video available for this location.</p>`;
        }

        document.getElementById("eventModal").style.display = "block";
      });
    });

    console.log("Markers added");

    // Create and add legend
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = "<h4>Categories</h4>";

      for (const category in categories) {
        div.innerHTML += `
            <div class="legend-item" data-category="${category}">
              <i style="background: ${categories[category]}"></i>
              ${category}
            </div>`;
      }

      return div;
    };
    legend.addTo(map);

    console.log("Legend added");

    // Add event listeners to legend items AFTER the legend is added to the map
    setTimeout(() => {
      document.querySelectorAll(".legend-item").forEach((item) => {
        const categoryText = item.getAttribute("data-category");

        item.addEventListener("mouseenter", function () {
          console.log("Hovering over:", categoryText);
          // Make markers in this category bigger
          if (markersByCategory[categoryText]) {
            markersByCategory[categoryText].forEach((marker) => {
              const element = marker.getElement();
              // Save original size if not already saved
              if (!element.dataset.originalWidth) {
                element.dataset.originalWidth =
                  window.getComputedStyle(element).width;
                element.dataset.originalHeight =
                  window.getComputedStyle(element).height;
                element.dataset.originalFontSize =
                  window.getComputedStyle(element).fontSize;
              }
              // Increase size
              element.style.width = "40px";
              element.style.height = "40px";
              element.style.marginLeft = "-20px";
              element.style.marginTop = "-20px";
              element.style.fontSize = "20px";
              element.style.display = "flex";
              element.style.justifyContent = "center";
              element.style.alignItems = "Center";
              element.style.zIndex = "1000"; // Bring to front
            });
          }
        });

        item.addEventListener("mouseleave", function () {
          // Return markers to normal size
          if (markersByCategory[categoryText]) {
            markersByCategory[categoryText].forEach((marker) => {
              const element = marker.getElement();
              // Restore original size
              element.style.width = element.dataset.originalWidth;
              element.style.height = element.dataset.originalHeight;
              element.style.marginLeft = "-13px";
              element.style.marginTop = "-13px";
              element.style.fontSize = element.dataset.originalFontSize;
              element.style.zIndex = "";
            });
          }
        });
      });
      console.log("Hover listeners added to legend items");
    }, 1000); // Give the legend time to be rendered

    // Event modal close button functionality
    document.querySelector(".close-btn").addEventListener("click", function () {
      document.getElementById("eventModal").style.display = "none";
    });

    // Welcome modal close button functionality
    document
      .getElementById("welcomeCloseBtn")
      .addEventListener("click", function () {
        document.getElementById("welcomeModal").style.display = "none";
      });

    // Start exploring button functionality
    document
      .getElementById("startExploring")
      .addEventListener("click", function () {
        document.getElementById("welcomeModal").style.display = "none";
      });

    // Close modals when clicking outside of them
    window.addEventListener("click", function (event) {
      if (event.target == document.getElementById("eventModal")) {
        document.getElementById("eventModal").style.display = "none";
      }
      if (event.target == document.getElementById("welcomeModal")) {
        document.getElementById("welcomeModal").style.display = "none";
      }
    });

    // Show welcome modal after map is fully initialized
    setTimeout(function () {
      document.getElementById("welcomeModal").style.display = "block";
      console.log("Welcome modal displayed");
    }, 1000);

    // Trigger a resize event to ensure the map renders correctly
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
      console.log("Resize event triggered");
    }, 500);
  } catch (error) {
    console.error("Error initializing map:", error);
    alert(
      "There was an error loading the map. Please check the console for details."
    );
  }
});
