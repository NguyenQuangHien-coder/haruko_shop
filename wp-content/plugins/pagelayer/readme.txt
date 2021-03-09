=== Page Builder: PageLayer - Drag and Drop website builder ===
Contributors: pagelayer
Tags: page builder, editor, landing page, drag-and-drop, pagelayer, form-builder, popup, widgets, softaculous, visual editor, wysiwyg, design, maintenance mode, coming soon, under construction, website builder, landing page builder, front-end builder, site-builder
Requires at least: 4.7
Tested up to: 5.5
Requires PHP: 5.5
Stable tag: 1.3.5
License: LGPL v2.1
License URI: http://www.gnu.org/licenses/lgpl-2.1.html

The most advanced frontend drag & drop page builder. PageLayer is a light weight but extremely powerful Website Builder. With PageLayer you can create great looking websites much faster. Works with any theme and any page.

== Description ==

Pagelayer is a WordPress page builder plugin. Its very easy to use and very light on the browser. Pagelayer works with any WordPress theme. Pagelayer is a real time editor and you can create beautiful web pages and web sites in a few minutes ! You dont need any programming knowledge when using Pagelayer. Pagelayer comes with top-notch features with a great UX and simple UI.

[Home Page](https://pagelayer.com "PageLayer Homepage") | [Support](https://pagelayer.deskuss.com "PageLayer Support") | [Documents](http://pagelayer.com/docs "Documents")


== Widgets ==

We have large number of widgets so you can design your page by selecting the widget from widget area.

== Drag & Drop Editor ==

Design your page by dragging widgets from given choices of widget. You will be able to create amazing sections of your website much easily. And you can move them by simply dragging them.

== Real Time Design ==

Whenever you make changes on your page it gets updated instantly on your page. It helps you design your page quickly by saving your time.

== In-line Editing ==

Simply click on any text and by typing you can add your new text. A variety of header and text options enhance your experience as well.

== Typography ==

With this feature you can beautify your page content by changing font-size, weight, transform, decoration. You can also add google fonts to beautify content of page.

== Duplicate ==

Simply click on this option and it will create exact copy of existing element by saving your time.

== Animation ==

Create your page more attractive with animation effects that trigger when the element is in display area.

== Styling Options ==

With large number of styling options you can design your page the way you want such as: background overlay, background image, box shadow etc.

== Easily Customizable ==

Each widget has multiple options to fully customize the widget such as change font colors, sizing and spacing.

== Widgets in the Free Version ==

* Row
* Columns
* Title
* Rich Text
* Quote
* List
* Icon
* Badge
* Tooltip
* Image
* Image Slider
* Video
* Grid Gallery
* Button
* Tabs
* Accordion
* Collapse
* Image Box
* Icon Box
* Space
* Embed
* Shortcodes
* Counter
* Google Maps
* Testimonial
* Progress Bars
* Color Block
* Alert
* Divider
* Social Profile
* Star Rating
* Anchor

And more are in the making !

== Frequently Asked Questions ==

Do you have questions related to PageLayer ? Use the following links :

1. [Docs](http://pagelayer.com/docs)
3. [Help Desk](https://pagelayer.deskuss.com)
2. [Support Forum](http://wordpress.org/support/plugin/pagelayer)

== Screenshots ==

1. **Widgets** You can drag and drop any widgets from the left menu. 
2. **Quote Widget** Full width rows with a quote on the left and an image widget
3. **Image Slider** You can create beautiful sliders with Pagelayer. Its just a matter of choosing images. We also have multiple slider options.
4. **Image and Icon Box** Image and icon boxes can be created with overlays, etc.
5. **Image Widget** You can create image overlays with captions and also lightboxes with Pagelayer
6. **Sections** Pagelayer has a nice grid systems with rows and columns. You can create sections so much easily with Pagelayer

== Changelog ==

= 1.3.5 (November 9, 2020) =
* [Security-Fix] In the Pagelayer -> Website Settings, the output was not escaped for certain settings. We would like to thank Ram Gall from the WordFence team for pointing this out. Full disclosure will be available after 48 hours from the release of this version.

= 1.3.4 (November 4, 2020) =
* [Improvement] Added option for the top / bottom position for the contact form success / failed message.
* [Improvement] Added "Open link in new window (tab)" option to the social widget.
* [Bug-Fix] After submitting the contact form the default success/failed message was not shown if the message was not set from the setting. This is fixed.
* [Bug-Fix] The post content widget was not working properly for the password protected posts. This is fixed.

= 1.3.3 (November 2, 2020) =
* [Bug-Fix] The last version of Pagelayer was causing a set_current_screen conflict with WooCommerce. This is fixed.

= 1.3.2 (October 28, 2020) =
* [Feature] The post properties in Pagelayer editor has been further improved, now clicking on the setting icon modal will be shown, from where you can setting up post properties. 
* [Feature] Advanced Custom fields are now supported in the Pagelayer Editors new post properties.
* [Feature] The tabs, accordion and collapse widgets have been further improved. Now user can drag widgets inside these widgets.
* [Feature] Added single page Import support for PopularFX templates.
* [Task] From this version onwards, we are starting to save the post content in block format.
* [Bug-Fix] If the Pagelayer editor was not enabled for the post type, the "Edit with pagelayer" link was shown. This is fixed.
* [Bug-Fix] If the comment was closed for the post, the  comment count in the post info widget was still showing. This is fixed.
* [Bug-Fix] In the some cases the link was not rendering properly in th list widget. This is fixed.

= 1.3.1 (October 13, 2020) =
* [Improvement] Added the option to save the popup cookie on closing as well.
* [Improvement] Added Cell Width options for Table Cells.
* [Improvement] In Social Share Widget, added the profile name option for Instagram, Skype, Dribbble, etc.
* [Improvement] Added option to disable title in site title widget. Now you can disable the site title if the logo is enabled.
* [Improvement] Added auto-detection for reply-to email in contact form. Now if the user does not add reply-to in addition fields then we will detect email from user-submitted data.
* [Improvement] Added $site_title variable in contact form, now user can use use $site_title to print site title.
* [Improvement] Copyright text can now be saved from the Widget itself while editing in Pagelayer.
* [Task] In some cases givecss.php was blocked by certain plugins to execute due to PHP. We have improved detection of the same and it will be served over admin-ajax.php to by pass such plugins. Pagelayer will also detect if givecss.php is functional and access it directly for better speed if possible.
* [Task] Default values for Archive Posts have been set for better compatibility in responsive mode.
* [Task] For contact forms, an only Label option type has been added.
* [Task] In testimonial sliders if there is no image set for a testimonial, then no image will be shown. Earlier the pagelayer default image was shown.
* [Bug-fix] The detection script for givejs.php and givecss.php which serves compressed CSS and JS files was not working correctly in certain cases. This is fixed.
* [Bug-Fix] The Star widget would not show full coverage when a 5 stars was set. This is fixed.
* [Bug-Fix] Unnecessary new lines were being entered in certain widgets. This is fixed.
* [Bug-Fix] While saving the Address, Phone Number, etc in Pagelayer Contact Settings, certain special characters were getting a Slash Prefix. This is fixed.
* [Bug-Fix] In Modal Popup, the live view was not being set correctly when the close option was set to outside. This is fixed.

= 1.3.0 (September 26, 2020) =
* [Improvement] We have improved the Editor UX. Now we will show you a small notice modal for 5 seconds for your actions.
* [Improvement] The copy-paste method has been further improved.
* [Task] In certain cases the JS and CSS file was not loaded properly because PHP execution was not allowed for compressing the static content. We have added auto detection to serve via PHP if its available.
* [Bug-Fix] In the primary menu widget if the menu name was longer, the menu item would exceed the border. This is fixed.
* [Bug-Fix] While duplicating, the accordion and collapse widgets were not rendering properly. This is fixed.
* [Bug-fix] In some cases, while turning on the error report in PHP, some PHP error notice was shown. This is fixed.
* [Bug-fix] The popup option styles were not applied properly. This is fixed.
* [Bug-fix] The clone and delete icons were removed from the Body Props as they were not in use.

= 1.2.9 (September 23, 2020) =
* [Bug-Fix] The image box and icon box widget content lines were broken with characters. This is fixed.
* [Bug-Fix] In certain cases the animation heading widget was not rendering properly after last version. This is fixed.

= 1.2.8 (September 18, 2020) =
* [Task] Adding support for block formats in Pagelayer. This is complete but due to compatibility, we are still storing in shortcodes which will change over the next few versions.
* [Improvement] The CSS rendering method has been further improved and will reduce your page size.
* [Bug-Fix] While applying the page/post revisions, the revision content was not rendering properly. This is fixed.
* [Bug-Fix] In the Image Hotspot widget "Tooltip Display" was not working properly. This is fixed.
* [Bug-Fix] If the animation heading widget contains the <p> tag then it was not rendering properly. This is fixed.

= 1.2.7 (September 15, 2020) =
* [Improvement] Description added in Phone, Email, Address, Copyright widgets.
* [Improvement] For the Modal Widget, clicking on the grey background will close the Modal box.
* [Improvement] The splash widget has been further improved and added a max-height option for the splash container.
* [Bug-Fix] List Item widget url not showing dropdown of suggestions of pages and posts. This is fixed.
* [Bug-Fix] RSS and Archive WordPress widget checkboxes were not working properly. This is fixed.
* [Bug-Fix] Shadow setting was not hiding even after changing the animation type to rotating. This is fixed.
* [Bug-Fix] Rotate-2, Rotate-3 and Scale effects in animated heading was not working after refresh. This is fixed.
* [Bug-Fix] Adding many Animated Headings in a page was not working properly. This is fixed.
* [Bug-Fix] Image Hotspot widget animation was not working. This is fixed.
* [Bug-Fix] Image Hotspot widget tooltip with display on click was not working properly. This is fixed.
* [Bug-Fix] Facebook Embed widget width was not responsive. This is fixed.
* [Bug-Fix] Single word content in Icon Box widget was not splitting, due to this the text was crossing the border of the widget. This is fixed.
* [Bug-Fix] In some cases button with stretched property was crossing its border. This is fixed.
* [Bug-Fix] Image Box and Icon Box widget animation was not working when url is added. This is fixed.

= 1.2.6 (September 7, 2020) =
* [Bug-Fix] If JetPack WP.ME / shortlinks were enabled, Pagelayer editor would not open due to the wrong URL structure. This is fixed.
* [Bug-Fix] A Column would not hid in Mobile view when the "Hide in Mobile" option was enabled. This is fixed.
* [Bug-Fix] pagelayer_pl_row_slider error was shown for some PopularFX themes. This is fixed.

= 1.2.5 (August 28, 2020) =
* [Bug-Fix] In certain cases the Pages/Posts title was replaced with previous title. This is fix.

= 1.2.4 (August 28, 2020) =
* [Task] We have tested the jQuery changes in WordPress 5.5.
* [Bug-Fix] WordPress widgets were not rendering properly. This is fixed.
* [Bug-Fix] In some cases CSS was not rendering properly. This is fixed.
* [Bug-Fix] In the Accordion and Collapse widget, when we click on the content area, the Accordion and Collapse tabs were closed. This is fixed.

= 1.2.3 (August 24, 2020) =
* [Task] The language strings which were hard-coded have been moved to the pagelayer language pack.
* [Task] Added option to open link in new tab for the image box and icon box widget.
* [Bug-Fix] The Textarea property has been further improved, now Textarea resizes vertically.
* [Bug-Fix] Removed some incompatible code.
* [Bug-Fix] The right side block background color was not correctly applied to the hover in the timeline widget. This is fixed.
* [Bug-Fix] In the accordion and collapse widget the active tab color was not working properly. This is fixed.
* [Bug-Fix] In certain cases, the Pagelayer editor was stuck at 90% due to a js error related to fonts. This is fixed.
* [Bug-Fix] The Modal widget has been further improved and added a max-height option for the modal container.
* [Bug-Fix] While editing a page/post if anyone clicked on a link outside the editable area, the page was redirected and changes were not saved. This is fixed.

= 1.2.2 (August 11, 2020) =
* [Bug-Fix] In some cases, the width of the columns of a Pagelayer Template while editing a post was not applied properly. This is fixed.

= 1.2.1 (August 10, 2020) =
* [Improvement] If there is a Javascript error during Pagelayer editor loading, the users will be shown the error and also a support option will be shown to the user !
* [Improvement] For the Splash Widget, clicking on the grey background will close the splash box.
* [Improvement] Its now possible to import templates of a theme which are made with Pagelayer.
* [Task] Added a Getting Started informative page and video for our users.
* [Task] Improved the login widget in the premium version of Pagelayer.
* [Bug-Fix] On window resize, the Facebook page widget will be resized as well.
* [Bug-Fix] For the Video widget, the overlay image was not shown properly and also the video would not play when the image overlay was clicked. This is fixed.

= 1.2.0 (July 23, 2020) =
* [Improvement] Mobile and tablet preview on the editor has been improved. Now the width of the preview will be determined according to the values set in the Website Settings of Pagelayer.
* [Improvement] The element hide media query has been improved for Desktops, Tablets and Mobiles.
* [Improvement] The table widget has been further improved. Now users can edit a table cell content in the live editor rather than using the left panel to set the values.
* [Task] The website settings are now available in the free version of Pagelayer.
* [Task] Added width option for the Facebook page widget.
* [Task] The post title widget has been improved.
* [Bug-Fix] Text editor undo and redo icons were not correct. This is fixed.
* [Bug-Fix] In the certain cases, while editing the Splash widget the modal was hidden. This is fixed.
* [Bug-Fix] While using the product archives widget on a pagelayer template, the products list was not shown. This is fixed.

= 1.1.9 (July 14, 2020) =
* [Feature] Added Website settings to set global font styles and colors.
* [Improvement] We have improved the Link property and you can now search posts/pages links in your WordPress site. Those links will automatically be updated if the target URL changes.
* [Improvement] The image dropzone has further been improved. It will not show drop options if the dragged object is not an image.
* [Improvement] We have improved the export wizard. Now users can export posts by its type and also export the media.
* [Task] Added "playsinline" attribute in the background video in rows and columns.
* [Task] The Archive post widget has been improved and so has the all posts widgets.
* [Task] Added target option in Social Share widget.
* [Task] The post content widget will only show a dummy placeholder while using the post content widget in a Pagelayer Template. This makes it easy to edit and understand the structure of the template.
* [Task] Added dummy pagination for the Archive Posts widget while editing within a Pagelayer template.
* [Task] The language strings which were hard-coded have been moved to the language pack.
* [Task] The typography property has been further improved.
* [Task] Added placeholder for featured image widget while editing a Pagelayer Template.
* [Bug-Fix] Singular Templates were not showing Media / Attachments properly. This is fixed.
* [Bug-Fix] In certain cases, the Hide on Mobile / Tablet was not working properly. This is fixed.
* [Bug-Fix] The pQuery class name was conflicting with other plugins. This is fixed.
* [Bug-Fix] While editing a pagelayer template, the editable area was not shown in certain cases. This is fixed.
* [Bug-Fix] The Archive Title widget was not rendered properly while editing a Pagelayer Template. This is fixed.
* [Bug-Fix] The row max-width option was applied on its childrens row / inner row. This is fixed.
* [Bug-Fix] In certain cases, the singular/archive templates were not being saved properly and were applied to all the singular/archive pages respectively. This is fixed.

= 1.1.8 (July 02, 2020) =
* [Security-Fix] Our internal security audit revealed XSS vulnerabilities. This is fixed. Please upgrade to this version ASAP !
* [Bug-fix] When an image was clicked, the image gallery was opened to choose the image. This was a bug introduced in the last version and is fixed now.
* [Bug-fix] In certain cases, the rich text content was not rendered properly. This is fixed.
* [Bug-fix] On turning on the error report in PHP, some PHP error notice was shown. This is fixed.

= 1.1.7 (June 26, 2020) =
* [Feature] Now you can open the media library by clicking the images and choosing or uploading the same.
* [Tasks] Added Mute and Looping options in background video in rows and columns.
* [Bug-fix] On turning on the error report in PHP, some PHP error notice was shown. This is fixed.

= 1.1.6 (June 22, 2020) =
* [Bug-Fix] In certain cases some js error occurred while dragging and dropping the widget. This is fixed.

= 1.1.5 (June 19, 2020) =
* [Premium-Feature] Added the option to save widgets and sections as a Global Widget / Section. Now the user can save the widgets and sections and use them on the entire site.
* [Feature] Image dropzone has been added to the image property, now user can add images via drag and drop.
* [Feature] Added "Make link" option for the phone and email widget.
* [Feature] We have added font styling options in the Options tab of the element.
* [Feature] Added tabs in the Pagelayer Templates List to filter templates by their type.
* [Feature] Added pagination option for the Grid gallery.
* [Task] Import theme content has been further improved. Now users can select advanced option before importing the theme.
* [Task] Added "snapchat-ghost" icon to the Share widget icons list.
* [Task] Added pointer height option in the Primary menu widget to manage height of pointers and also added the dropdown alignment option.
* [Bug-Fix] In certain cases, the video autoplay, loop and mute options was not working properly in the video widget. This is fixed.
* [Bug-Fix] In some cases, the Pagelayer Editor was unable to load while setting motion effects. This is fixed.
* [Bug-Fix] In certain cases, when a revision of the post/page was applied, after updating the post, the post/page was invisible from the "All Pages" page. This is fixed.
* [Bug-Fix] In some cases, YouTube videos were not being loaded properly in the lightbox. This is fixed.

= 1.1.4 (May 27, 2020) =
* [Premium-Feature] Added options to add site-key, secret-key and language for reCaptcha in settings.
* [Feature] Added button style type "animated" in button widget.
* [Task] Made Pagelayer compatible with PHP 7.4.
* [Bug-Fix] In the contact form, the variables in the mail template was not properly replaced, when the field name was an array. This is fixed.
* [Bug-Fix] When the editable area was missing, Pagelayer would get stuck at 90% without showing error. This is fixed.
* [Bug-Fix] In the Author box widget, the custom image holder was not set. This is fixed.

= 1.1.3 (May 19, 2020) =
* [Premium-Feature] Added new Timeline widget for our Pro users. You can now create beautiful timelines of your work by just dragging the widget !
* [Premium-Feature] Added option to add custom attributes for the element in options property bar.
* [Premium-Feature] Added file option in contact form item. Now user can add file upload option in contact form.
* [Improvement] Group property has been further improved. Now user can sort the group items.
* [Improvement] The update button UI has been improved.
* [Improvement] The "Progress Bar" widget has been improved. Added background color, border-radius, prefix and sufix options.
* [Bug-Fix] In the premium audio widget the width was not working properly. This is fixed.
* [Bug-Fix] In the Author box widget, the custome biography set was not visible. This is fixed.

= 1.1.2 (May 6, 2020) =
* [Security] For security reasons, we have changed the nonce names for the editor and for non-editor tasks. We urge all users to update to Pagelayer 1.1.2 as soon as possible.

= 1.1.1 (May 2, 2020) =
* [Security-Fix] There was a missing nonce check in the settings page of Pagelayer. This was reported by WordFence and is fixed.
* [Security-Fix] Capability checks were missing in save content function of Pagelayer. This was reported by WordFence and is fixed. We urge all users to update to Pagelayer 1.1.1 as soon as possible due to these security fixes.
* [Premium-Feature] The Pagelayer settings have added the option to add custom header and footer code for the entire site, and you can also add custom header and footer code for particular pages / posts from the "Edit Body and Post Props" option in the Pagelayer editor.
* [Premium-Feature] Added "From Email" and "Additional Headers" options for the contact forms in the Pagelayer settings.
* [Premium-Feature] Added options to create custom mail template for the contact forms in the "Contact form" widget.
* [Task] The new property type "model" is defined.
* [Bug-Fix] In the audio widget, the play and volume icon was invisible. This is fixed.
* [Bug-Fix] In the contact form widget, the Redirect option was not working. This is fixed.
* [Bug-Fix] In some cases, memory was exhausted while loading the shortcodes.

= 1.1.0 (April 17, 2020) =
* [Task] The "Element ID" option has been added for the items in the accordion and collapse widget, Now you can use the accordion and collapse widget as a reference link.
* [Task] Made Pagelayer compatible with the "Smush" plugin.
* [Task] Added box shadow option in the button widget.
* [Bug-Fix] In the accordion widget "Default active tab" option of the accordion item was not working. This is fixed.
* [Bug-Fix] The color preview in the "box shadow" properties was not working the first time. This is fixed.
* [Bug-Fix] If the column already contains an inner-row, the columns are prevented from dragging in the inner-row.

= 1.0.9 (April 11, 2020) =
* [Premium-Feature] Cookie option added to popup template. Now you can hide a popup for a fixed time with the help of the cookie at the click of close button. This is particularly useful to create a Cookie Consent popup.
* [Task] Some WordPress themes did not have an "entry-content" class to wrap post content. Hence Pagelayer was unable to find the editable region. Now we have added the wrapper with the class "pagelayer-editable-area" to create an editable region.
* [Task] Added a placeholder to the grid gallery widget.
* [Task] Added typography option for image caption in the image widget.
* [Bug-Fix] Added cursor pointer to button in button widget.
* [Bug-Fix] In certain cases, there were some js errors in the action history. This is fixed.
* [Bug-Fix] In certain cases, Pagelayer was unable to get the contents of the section from the Pagelayer API. This is fixed.
* [Bug-Fix] In the inner row widget the background elements was not working. This is fixed.
* [Bug-Fix] In the inner row widget, shape styles was not working. This is fixed.
* [Bug-Fix] If zlip compression was on in PHP, ob_gzhandler used to give an error due to which Pagelayer failed to load in some cases. This is fixed.

= 1.0.8 (March 24, 2020) =
* [Premium-Feature] We have added Scrolling Effects and Mouse Effects feature in Pagelayer. You can now set an animation to an element on mouse movement or on scroll.
* [Feature] We have now added 300+ sections in Pagelayer. You can 1-click add sections to a post / page. We have also added many pages so that you can build your website with just a few clicks.
* [Feature] Added "Import Theme" option in Pagelayer. A theme needs to be a pagelayer exported theme so that anyone can import the theme.
* [Feature] Most text fields are now editable from the Editor window itself without the left bar text fields. This enhances the editing experience.
* [Improvement] We have added a pre-loader to the Pagelayer editor.
* [Improvement] The Left-bar UI has been improved. Much more UI changes are coming !
* [Improvement] The Add Section wizard, has been further improved. The speed of image loading has also improved and we will improve the sections further.
* [Improvement] Added more options for popup builder. Advanced options are coming soon.
* [Task] Added the option to de-select the options from multi-select property type.
* [Task] The Pagelayer Editor left top bar UI is also improved.
* [Task] We are re-building our docs and also making some video tutorials for our users.
* [Bug-Fix] In certain cases, additional whitespace was added to the attributes. This is fixed.
* [Bug-Fix] In certain cases, widgets were broken when we use double code in text. This is fixed. 
* [Bug-Fix] The image portfolio icon was missing. This is fixed.

= 1.0.7 (March 3, 2020) =
* [Feature] The Add New Section code is now working. We have added 10 blocks and more are on the way.
* [Task] Improved the layout of the color selector. Also when no color is selected, the color box will show blank space instead of white color.
* [Task] Some more improvement has been done to the Pagelayer Widget Settings UI.

= 1.0.6 (February 20, 2020) =
* [Feature] Added settings for widgets - Contact Email, Phone, Address. You can specify these defaults and it will be changed throughout the website.
* [Feature] Added keyboard options Ctrl+S to update posts.
* [Feature] Added size and space option for the slider dots for all Slider widgets.
* [Feature] Added screen mode options for typography and alignment in  the Contact Email, Phone and Address widgets.
* [Premium-Feature] Added new widget for Image Portfolio.
* [Premium-Feature] Added inline and spacing option for radio button in Contact form widget.
* [Premium-Feature] Added dropdown breakpoint option for responsive menu in Primary Menu widget.
* [Premium-Feature] Added pagination option in Archive Posts widget.
* [Premium-Feature] Added padding option for content in Archive Posts and Posts widget.
* [Premium-Feature] Added screen mode options to the Primary Menu widget where needed.
* [Task] Now when you add a new row or inner row, a column will be added automatically.
* [Task] The Row, Column and Elements hover UI has been improved.
* [Task] From now on, we are saving the Pagelayer ID. So that they are consistent all the time.
* [Task] The left panel font has been changed to Roboto to improve the UI of the left panel.
* [Bug-Fix] In the flip box widget, the front side of the flip box was not being hidden properly when flipping. This is fixed.
* [Bug-Fix] In the pen menu, some icons were not visible. This is fixed.

= 1.0.5 (January 21, 2020) =
* [Feature] Added new widgets - Contact Email, Phone, Address, Copyright. You can specify these defaults and it will be changed throughout the website.
* [Feature] Added the screen mode option for the custom Column Width in Column widget.
* [Feature] Accordian Content Padding and border radius have been added.
* [Feature] Added breakpoint settings for Tablet and Mobiles
* [Feature] Premium Feature - Added the feature to make an element sticky
* [Feature] Added the option to save default Social Profile URLs. These URLs will be used while editing and can be altered while editing.
* [Task] Now when you undo and redo, the affected element will become active and the page will also scroll to that element.
* [Task] Added the additional parameters with pagelayer_trigger_action function in javascript.
* [Task] For a Cite in Quotes, text align option has been added.
* [Task] Added the option to remove the Icon selected in the icon properties.
* [Task] In mobile/tablet view we have improved the responsive beahviour.
* [Task] The Ctrl-z and Ctrl-y behaviour has been further improved. Now when you undo, the actions within the last 200 milli seconds will be undone.
* [Task] Added function to get current media mode according to pagelayer tablet and mobile breackpoint in Javascript.
* [Bug-Fix] Added overflow to accordion items to fix the overflow in some cases.
* [Bug-Fix] Ctrl-z will now work on the entire window. Previously you had to focus back on the editor and then it would work. This is fixed.
* [Bug-Fix] While editing the header if the Row was at 0px of the window, the row options were not visible. This is fixed.
* [Bug-Fix] The Add New Section / Widgets area at the bottom of the content window was aligned to the right. Now its centered.
* [Bug-Fix] The column width dragging feature had some bugs where it would not allow resize. This is fixed.
* [Bug-Fix] The anchor overlay in the icon box / image box widgets was going wrong. This is fixed.
* [Bug-Fix] In editor, on clicking setting and property close icons in left bar, the left bar move was triggered. This is fixed.
* [Bug-Fix] We were not registering pagelayer actions while resizing the columns. This is fixed.
* [Bug-Fix] In certain cases the video url was sanitize properly. This is fixed.
* [Bug-Fix] The custom width property of the element in the options was not working properly. This is fixed.

= 1.0.4 (December 12, 2019) =
* [Feature] Added Line Height to the Rich Text Editor.
* [Feature] Added the option to edit or delete an item from the Navigator.
* [Feature] Added the option to set a font for the whole site.
* [Feature] Premium Feature - Column Background Slider has been added.
* [Feature] Premium Feature - We have created a Popup builder in Pagelayer.
* [Task] We have added more units to various properties so that you can choose either px, %, vw, etc for the respective settings.
* [Task] Added hover delay for Site Title.
* [Task] The Image Selector tool UI was not proper. We have improved it.
* [Task] The Grid Flex structure has been improved.
* [Task] Javascript language string export in the editor is now completed.
* [Task] The Rich Text Editor box options have been re-arranged to minimize the utilization of space.
* [Task] More font-weight options have been added to typography options.
* [Bug-Fix] In certain properties decimal values were not allowed. This is fixed.
* [Bug-Fix] Color options did not work in Microsoft browsers like Edge or IE. This is fixed by using RGB when the alpha is set.
* [Bug-Fix] Row content v-align and Column content v-align used to not work properly in some cases. This is fixed.
* [Bug-Fix] The blank image used to exceed the element width. This is fixed.
* [Bug-Fix] Ctrl-z in image URL option of the media box used to undo pagelayer actions. This is fixed.

= 1.0.3 (November 17, 2019) =
* [Task] We have launched Pagelayer Pro with features like 60+ widgets, 400+ sections, Theme Builder, WooCommerce Builder, Theme Creator and Exporter, Form Builder, Popup Builder, etc.
* [Bug-Fix] Animation effects used $ instead of jQuery which broke things in WordPress 5.3. This is fixed.

= 1.0.2 (November 17, 2019) =
* [Feature] You can now drag the left bar to the right or keep it in the center. Even if you close it, the properties will appear if you edit an existing element.
* [Feature] Added a navigator to see the elements structurally.
* [Feature] Added Font-Awesome 5 with backward compatibility for v4.
* [Feature] Added Position Styles for an element. You can now set the position of an element to Relative, Absolute, Fixed. Various customizations are now possible because of this.
* [Feature] Added ctrl+d to duplicate the active element.
* [Feature] Added custom x/y position for background image in Element Options for all widgets.
* [Task] Font-Awesome 5 will now be gzipped and served.
* [Task] Pagelayer editor icons have been updated.
* [Task] Added a X-icon option in the widget search field to clear the search box.
* [Task] Added Spread and Inset / Outset options to Box Shadow.
* [Task] Added background slider option in Row and Columns for the Pro version.
* [Task] Added the option to add the Pagelayer Pro license in the Free Version and install the Pro version from the license page itself.
* [Bug-Fix] A trigger action was causing things to break in WordPress 5.3. This is fixed.
* [Bug-Fix] List item was not getting a width of 100% of the holder. This is fixed.
* [Bug-Fix] In some cases the cache control for the editor JS was failing. This is fixed.
* [Bug-Fix] If text shadow was given to a heading for hover, it was not working. This is fixed.

= 1.0.1 (November 1, 2019) =
* [Feature] Added the Post and Body options. You can now give Styles to the body as well. Click the settings icon on the right of the Pagelayer logo to edit the body and post properties.
* [Feature] Added premade Section(s) wizard for the users in the editor. We will be launching 100s of sections, headers, footers, etc. to build websites faster.
* [Feature] You can now Insert from URL even in an image slider. You will need to enter comma seperated URLs.
* [Feature] Added hover effects for Title Widget.
* [Task] Added rel option for Button Widget.
* [Task] Added tooltips in the editor to improve the editor UX.
* [Task] Further improved the speed of the editor by shifting the shortcodes data to a cached javascript file.
* [Task] Added actions / triggers in the Javascript API of the Pagelayer Live Editor.
* [Task] If the sidebar in the editor is closed and an element is clicked, the sidebar will be opened with the properties of the element shown.
* [Task] localstorage will be used for the copy and paste events.
* [Task] UI Changes for the Pagelayer Editor.
* [Task] An element can now hide properties if not required for the element. This is a dev related feature.
* [Bug Fix] You can now undo a drag of an element i.e. if you move an element from position 1 to position 2 and undo the changes, the element will be restore to position 1.
* [Bug Fix] If the last column in a row was moved ahead, the column resize option was not shown for that column. This is fixed.
* [Bug Fix] While resizing a column, if the mouse moved beyond the boundaries of the element, the resize percentage was not shown. This is fixed
* [Bug Fix] If an element was copied and pasted, the text formatting used to be lost in certain cases. This is fixed.
* [Bug Fix] While typing in the editor, if delete key was pressed, the element used to be deleted. This is fixed.
* [Bug Fix] If an element was copied and while entering the URL of an image, the copied element used to be pasted after the active element. This is fixed.
* [Bug Fix] If any section containing properties in the Editor sidebar were empty, that section was still shown. This is fixed.
* [Bug Fix] If a custom width was set for a column and that was duplicated, the row holding that column used to get the column width. This is fixed.
* [Bug Fix] There were 2 shadow options for an element. We have removed the one from the Border Style. Shadow options for the element is now available only in Box Style.
* [Bug Fix] If the user was not logged in, WordPress related widgets were not getting rendered. This is fixed.
* [Bug Fix] Inner rows were inheriting the width property of the parent row and ignoring their own width property. This is fixed.
* [Bug Fix] If the slug was changed, in some cases the Pagelayer editor would fail to load because WordPress removed the pagelayer-live param from the URL in the old slug URL. This is fixed.

= 1.0.0 (September 27, 2019) =
* [Feature] Added the option to resize columns by dragging the divider between the 2 columns.
* [Feature] Images can now be pasted from the Clip Board in the Pagelayer Editor. These images will be uploaded and saved.
* [Feature] You can now copy Pagelayer Elements from one editor tab into another editor tab.
* [Feature] Image and Icon Box's can now have a link for the whole box.
* [Feature] Added rotate option to Icon Widget.
* [Task] Added the option to remove the color from a color setting to reset to default.
* [Task] Improved the Image filter options setting in Pagelayer editor.
* [Task] Removed the empty space of the Admin Bar in Pagelayer editor.
* [Task] Added Screen options for a number of Widget Settings.
* [Bug Fix] On the blog page if the first post was not a Pagelayer post, the other posts were not rendered. This is fixed.
* [Bug Fix] On some servers the pagelayer editor JS used to fail to load because of the URL having base64 as a file name.
* [Bug Fix] If a Page / Post did not have a title, Pagelayer Live Editor used to fail. This is fixed.
* [Bug Fix] The Color Picker had a z-index lower than the rich text editor. This is fixed.
* [Bug Fix] The Divider widget had extra spacing which is now fixed.

= 0.9.9 (September 10, 2019) =
* [Feature] Added inline editing so you can now edit text / headers in the editor itself. 
* [Task] Editor Font Size has been introduced.
* [Task] The cursor for add widget area has been set to pointer.
* [Bug Fix] In the Pagelayer Editor the title of the page was not set. This is fixed.
* [Bug Fix] The overflow given to a column was extending beyond the column. This is fixed.
* [Bug Fix] The active accordion tab was not shown by default. This is fixed.
* [Bug Fix] The correct screen mode was not set correctly in the beginning. This is fixed.
* [Bug Fix] The gradient color in the properties tab was not shown correctly the second time of editing. This is fixed.
* [Bug Fix] In image box, the spacing caused the image to go outside its holder. This is fixed.

= 0.9.8 (August 20, 2019) =
* [Task] In the editor, improved the widget border colors for better user experience
* [Task] Improved the right click options UI and added icons
* [Task] The widget left bar has been improved
* [Task] Improved the search box UI in the left bar
* [Task] The widget properties UI has been improved
* [Task] The editor bottom bar UI has been improved
* [Bug Fix] Testimonial widget was not working. This is fixed.

= 0.9.7 (August 13, 2019) =
* [Feature] Introducing template feature which allows theme developers to make their themes with Pagelayer
* [Feature] Added Settings in the editor to change the post title
* [Task] Image Box added border options for the image
* [Task] Added heading hover style options for Image Box and Icon Box
* [Task] Added Column Gap and Row Gap for Grid Gallery
* [Task] Added font family to the text editor
* [Task] Added the screen type option for multiple settings
* [Task] Made Owl Carousel the default slider as it has much more features
* [Task] Improved code for AJAX Calls

= 0.9.6 (June 25, 2019) =
* [Bug Fix] Undo History small fix

= 0.9.5 (June 21, 2019) =
* [Feature] Added revision control
* [Feature] Added the ability to manage actions while editing i.e. undo and redo
* [Feature] Added keyboard options like ctrl+c, ctrl+v, ctrl+z, ctrl+y

= 0.9.4 (May 7, 2019) =
* [Feature] Added Inner Row which allows to create columns within columns for complex designs
* [Task] The PageLayer Admin JS and CSS was loaded everywhere in the admin panel. This is fixed.
* [Bug-Fix] The PageLayer rating message was not dismissable. This is fixed.


= 0.9.3 (Apr 22, 2019) =
* [Task] Improved Shortcodes to implement custom widgets

= 0.9.2 (Apr 16, 2019) =
* [Feature] The drag engine is now much faster
* [Feature] Added stretch to the row handler
* [Feature] You can now drag on the Add Widget utility
* [Feature] Image filter properties have been added
* [Task] Progress Bars and Counters will be loaded when the widget becomes visible and not on pageload
* [Bug-Fix] If a property was clicked which showed new widget properties in the left panel, then the active tab used to lose focus. This is fixed.
* [Bug-Fix] The unit which was saved was not being shown in the properties. This is fixed.
* [Bug-Fix] For Tabs widget the tab name was not updated in the properties when changed. This is fixed.
* [Bug-Fix] For padding and linked values in the widget properties was not shown. This is fixed.

= 0.9.1 (Apr 8, 2019) =
* Fixed the hover option icon size
* Fixed the video overlay issue

= 0.9.0 (Apr 4, 2019) =
* Released Plugin
