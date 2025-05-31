<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>V-Notch Weir</title>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
  </script>
</head>
<body>

  <h2>V-Notch Weir</h2>
  <p>
    A V-notch weir is a triangular-shaped notch used to measure the flow of water in open channels.
    It is preferred for small discharge measurements because of its high sensitivity to small changes in flow.
  </p>

  <h2>Flow Equation</h2>
  <p>The theoretical discharge \( Q \) over a V-notch is given by:</p>

  <p>
    \( Q = \frac{8}{15} C_d \tan\left(\frac{\theta}{2}\right) (2g)^{1/2} H^{5/2} \)
  </p>

  <p><strong>Where:</strong></p>
  <ul>
    <li>\( Q \) = Discharge (m³/s)</li>
    <li>\( C_d \) = Discharge coefficient (dimensionless)</li>
    <li>\( g \) = Acceleration due to gravity (9.81 m/s²)</li>
    <li>\( \theta \) = Angle of the notch (usually 90°)</li>
    <li>\( H \) = Head of water above the notch apex (m)</li>
  </ul>

  <p>For a 90° V-notch, the formula simplifies to:</p>
  <p>\( Q = 1.38 \cdot C_d \cdot H^{5/2} \)</p>

  <h2>Discharge Coefficient (\( C_d \)):</h2>
  <ul>
    <li>Accounts for energy losses and non-ideal flow behavior</li>
    <li>Typically ranges from 0.58 to 0.62 for a 90° V-notch</li>
    <li>Can be determined experimentally by comparing actual and theoretical discharge</li>
  </ul>

  <h2>Head Measurement (H):</h2>
  <ul>
    <li>Measured vertically from the apex of the notch to the free water surface</li>
    <li>Should be taken away from the notch (at least 4H upstream) to avoid surface disturbances</li>
  </ul>

</body>
</html>
