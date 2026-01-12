# Hero Section - Testing Guide

## 🎯 What to Test

This guide helps you test the reusable hero section implementation and capture screenshots for submission.

## 📸 Required Screenshots

Based on the task requirements, you need to capture:

### 1. Section in Theme Editor with Content Blocks
**What to show:** Hero section in the Shopify theme editor with all content blocks visible

**How to capture:**
1. Go to your Shopify admin → Online Store → Themes
2. Click "Customize" on your theme
3. Add a new section (click "+ Add section")
4. Select "Hero" from the section list
5. Add all three content blocks:
   - Heading block
   - Text block
   - Buttons block
6. Take a screenshot showing:
   - The theme editor sidebar with Hero section settings
   - All three content blocks visible in the block list
   - The preview showing the hero section

**Expected result:** 
- Hero section appears in the section list
- All three content blocks can be added
- Settings are visible and editable

---

### 2. All Customization Options
**What to show:** All available customization options in the theme editor

**How to capture:**
Take multiple screenshots or one comprehensive screenshot showing:

**Section Settings:**
1. **Image Settings:**
   - Image picker
   - Image overlay opacity slider (0-100%)
   - Image height dropdown (adapt, small, medium, large)

2. **Video Settings:**
   - Video URL field
   - Video cover image picker
   - Video description field
   - Enable video looping checkbox

3. **Content Settings:**
   - Desktop content position dropdown (9 options)
   - Desktop content alignment (left, center, right)
   - Show background box checkbox

4. **Mobile Settings:**
   - Mobile content alignment (left, center, right)
   - Show text below image checkbox

5. **Colors:**
   - Color scheme dropdown (5 options)

6. **Animation:**
   - Image animation dropdown (none, ambient)

**Block Settings:**
- Heading block: heading text, heading size
- Text block: text content, text style
- Buttons block: button labels, links, styles

**Expected result:** All settings are visible and functional

---

### 3. Video Embed Working
**What to show:** Video embed functionality with YouTube or Vimeo

**How to capture:**
1. In the Hero section settings, add a video URL:
   - YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
   - Vimeo: `https://vimeo.com/VIDEO_ID`
2. Optionally add a video cover image
3. Save and preview
4. Take screenshots showing:
   - Video URL field filled in theme editor
   - Preview showing video cover image with play button
   - After clicking play, video playing (optional)

**Expected result:**
- Video URL is accepted
- Cover image displays with play button overlay
- Video plays when clicked
- Video fills the background properly

---

### 4. Final Layout
**What to show:** The hero section as it appears on the frontend

**How to capture:**
1. Configure the hero section with:
   - Background image or video
   - Heading text
   - Description text
   - Two CTA buttons
2. Test different configurations:
   - With background box enabled
   - With background box disabled
   - Different content positions
   - Different alignments
3. Take screenshots showing:
   - Desktop view with content positioned correctly
   - Mobile view (responsive design)
   - Different color schemes
   - Different content positions

**Expected result:**
- Hero section displays correctly
- Content is readable and well-positioned
- Buttons are clickable
- Responsive on mobile devices

---

## 🧪 Test Scenarios

### ✅ Scenario 1: Basic Hero with Image
1. Add Hero section to a page
2. Upload a background image
3. Add heading block with text
4. Add text block with description
5. Add buttons block with 2 CTAs
6. Save and preview
7. ✅ **PASS** if all elements display correctly

### ✅ Scenario 2: Content Alignment
1. Set desktop content alignment to "Left"
2. Preview and verify content aligns left
3. Change to "Center" and verify
4. Change to "Right" and verify
5. ✅ **PASS** if all alignments work

### ✅ Scenario 3: Content Position
1. Test all 9 position options:
   - Top left, top center, top right
   - Middle left, middle center, middle right
   - Bottom left, bottom center, bottom right
2. Verify content moves to correct position
3. ✅ **PASS** if all positions work correctly

### ✅ Scenario 4: Background Box Toggle
1. Enable "Show background box"
2. Preview - box should be visible
3. Disable "Show background box"
4. Preview - box should be transparent
5. ✅ **PASS** if toggle works correctly

### ✅ Scenario 5: Video Embed
1. Add YouTube video URL
2. Add video cover image
3. Preview - cover image with play button should show
4. Click play button
5. Video should start playing
6. ✅ **PASS** if video works correctly

### ✅ Scenario 6: Image Overlay
1. Set image overlay opacity to 0%
2. Preview - no overlay
3. Set to 50%
4. Preview - medium overlay
5. Set to 100%
6. Preview - full overlay
7. ✅ **PASS** if opacity slider works

### ✅ Scenario 7: Color Schemes
1. Test all 5 color schemes:
   - Accent 1
   - Accent 2
   - Background 1
   - Background 2
   - Inverse
2. Verify colors change correctly
3. ✅ **PASS** if all schemes work

### ✅ Scenario 8: Mobile Responsive
1. Switch to mobile view (or use device)
2. Test mobile content alignment
3. Test "Show text below image" option
4. Verify buttons are touch-friendly
5. ✅ **PASS** if mobile layout works

### ✅ Scenario 9: Image Height Options
1. Test all height options:
   - Adapt to image
   - Small
   - Medium
   - Large
2. Verify section height changes
3. ✅ **PASS** if all heights work

### ✅ Scenario 10: Button Styles
1. Add buttons block
2. Set button 1 to primary style
3. Set button 2 to secondary (outline) style
4. Verify both styles display correctly
5. ✅ **PASS** if button styles work

---

## 🔍 Detailed Testing Steps

### Step 1: Access Theme Editor
```
Shopify Admin → Online Store → Themes → Customize
```

### Step 2: Add Hero Section
1. Click "+ Add section" button
2. Scroll to find "Hero" section
3. Click to add it

### Step 3: Configure Background
**Option A: Image Background**
1. Click "Image" setting
2. Upload or select an image
3. Adjust "Image overlay opacity" if needed
4. Select "Image height" (adapt, small, medium, large)

**Option B: Video Background**
1. Click "Video URL" setting
2. Paste YouTube or Vimeo URL
3. Upload "Video cover image" (optional)
4. Add "Video description" for accessibility
5. Enable "Enable video looping" if desired

### Step 4: Add Content Blocks
1. Click "Add block" button
2. Select "Heading"
   - Enter heading text
   - Choose heading size (h0, h1, h2)
3. Click "Add block" again
4. Select "Text"
   - Enter description text
   - Choose text style (body, subtitle, caption)
5. Click "Add block" again
6. Select "Buttons"
   - Enter "Button 1 label" and link
   - Choose button 1 style (primary/secondary)
   - Enter "Button 2 label" and link (optional)
   - Choose button 2 style (primary/secondary)

### Step 5: Configure Content Position
1. Set "Desktop content position" (9 options)
2. Set "Desktop content alignment" (left, center, right)
3. Toggle "Show background box" on/off
4. Set "Mobile content alignment"
5. Toggle "Show text below image on mobile"

### Step 6: Customize Appearance
1. Select "Color scheme"
2. Choose "Image animation" (none, ambient)

### Step 7: Test and Preview
1. Click "Save" button
2. Preview on desktop
3. Preview on mobile (use browser dev tools)
4. Test all interactive elements

---

## 🐛 Troubleshooting

### Hero Section Not Appearing
**Issue:** Section doesn't show in section list
**Fix:** 
- Clear browser cache
- Verify files are uploaded to theme
- Check for Liquid syntax errors

### Video Not Playing
**Issue:** Video embed doesn't work
**Fix:**
- Verify video URL is correct format
- Check if video is public (not private)
- Ensure deferred-media.js is loaded
- Check browser console for errors

### Content Not Positioning Correctly
**Issue:** Content position doesn't match selection
**Fix:**
- Verify CSS file is loaded
- Check for conflicting styles
- Clear browser cache

### Background Box Not Showing
**Issue:** Background box toggle doesn't work
**Fix:**
- Verify "Show background box" is enabled
- Check color scheme contrast
- Ensure CSS classes are applied correctly

### Mobile Layout Issues
**Issue:** Mobile view doesn't look right
**Fix:**
- Test with actual mobile device
- Check responsive breakpoints
- Verify mobile-specific CSS is loaded

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## ✅ Testing Checklist

Before submitting, verify:

- [ ] Hero section appears in theme editor
- [ ] All three content blocks can be added
- [ ] Image background works
- [ ] Video embed works (YouTube and Vimeo)
- [ ] All 9 content positions work
- [ ] All 3 alignments work (left, center, right)
- [ ] Background box toggle works
- [ ] Image overlay opacity works
- [ ] All 5 color schemes work
- [ ] Mobile responsive design works
- [ ] Buttons are clickable
- [ ] Video play button works
- [ ] No console errors
- [ ] No linting errors

---

## 📸 Screenshot Checklist

For submission, capture:

1. ✅ **Theme Editor View**
   - Hero section in sidebar
   - All content blocks visible
   - Settings panel open

2. ✅ **Customization Options**
   - All settings visible
   - Different configurations shown

3. ✅ **Video Embed**
   - Video URL in settings
   - Video playing or cover image with play button

4. ✅ **Final Layout**
   - Desktop view
   - Mobile view
   - Different configurations

---

## 🚀 Quick Test Script

1. **Add Section** → Hero
2. **Add Image** → Upload test image
3. **Add Blocks** → Heading, Text, Buttons
4. **Set Position** → Middle center
5. **Set Alignment** → Center
6. **Enable Box** → Show background box
7. **Save & Preview** → Check desktop
8. **Test Mobile** → Check responsive
9. **Test Video** → Add video URL
10. **Take Screenshots** → Capture all views

---

## 📚 Related Documentation

- **`TASK_7_SUMMARY.md`** - Implementation summary
- **`sections/hero.liquid`** - Section code
- **`assets/section-hero.css`** - Styling

---

## ✅ Status

**Implementation:** ✅ Complete  
**Testing:** Ready  
**Documentation:** ✅ Complete  
**Linting:** ✅ No errors  
**Ready for:** Testing and Screenshot Capture

---

Good luck with testing! 🚀
